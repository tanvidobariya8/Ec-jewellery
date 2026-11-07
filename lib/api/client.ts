import type { z } from "zod";

export type ApiErrorKind =
  | "network" // BE unreachable (down, DNS, CORS)
  | "timeout"
  | "not-found"
  | "unauthorized" // 401 — not signed in / session expired
  | "forbidden" // 403 — signed in without access
  | "conflict" // 409 — e.g. slug already used, record still in use
  | "validation" // 400 — the request was rejected
  | "rate-limited" // 429
  | "server" // 5xx
  | "invalid-response" // response did not match the zod schema
  | "config"
  | "unknown";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly kind: ApiErrorKind,
    public readonly status?: number,
    /** Field messages from the BE ValidationPipe (400). */
    public readonly details: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TIMEOUT_MS = 10_000;

function kindFromStatus(status: number): ApiErrorKind {
  if (status === 404) return "not-found";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 409) return "conflict";
  if (status === 400 || status === 422) return "validation";
  if (status === 429) return "rate-limited";
  if (status >= 500) return "server";
  return "unknown";
}

/** NestJS error bodies: `{ message: string | string[], error, statusCode }`. */
async function readErrorMessages(response: Response): Promise<string[]> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "message" in body) {
      const { message } = body as { message: unknown };
      if (Array.isArray(message)) return message.map(String);
      if (typeof message === "string") return [message];
    }
  } catch {
    // Non-JSON error body — fall through.
  }
  return [];
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  if (!API_URL) {
    throw new ApiError("API URL is not configured (NEXT_PUBLIC_API_URL).", "config");
  }
  try {
    return await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
      credentials: "include",
      signal: init?.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new ApiError(`Request timed out: ${path}`, "timeout");
    }
    throw new ApiError(`Could not reach the API: ${path}`, "network");
  }
}

/** Typed fetch wrapper for the backend (`../be`). Throws `ApiError` on any failure. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase();
  let response: Response;
  try {
    response = await request(path, init);
    // One retry for idempotent reads hit by a transient server error.
    if (method === "GET" && response.status >= 500) response = await request(path, init);
  } catch (error) {
    if (method === "GET" && error instanceof ApiError && error.kind === "network") {
      response = await request(path, init);
    } else {
      throw error;
    }
  }

  if (!response.ok) {
    const details = await readErrorMessages(response);
    throw new ApiError(
      `${method} ${path} failed: ${response.status}${details.length ? ` — ${details.join("; ")}` : ""}`,
      kindFromStatus(response.status),
      response.status,
      details,
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

/** GET + validate the response shape at the boundary. */
export async function apiGet<S extends z.ZodType>(path: string, schema: S): Promise<z.infer<S>> {
  const data = await apiFetch<unknown>(path);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError(
      `Unexpected response from ${path}: ${result.error.message}`,
      "invalid-response",
    );
  }
  return result.data;
}

/** Any method + validate the JSON response (admin mutations). */
export async function apiSend<S extends z.ZodType>(
  path: string,
  schema: S,
  init: RequestInit,
): Promise<z.infer<S>> {
  const data = await apiFetch<unknown>(path, init);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError(
      `Unexpected response from ${path}: ${result.error.message}`,
      "invalid-response",
    );
  }
  return result.data;
}

/** Like `apiGet`, but resolves to `null` on 404 (for `notFound()` in pages). */
export async function apiGetOrNull<S extends z.ZodType>(
  path: string,
  schema: S,
): Promise<z.infer<S> | null> {
  try {
    return await apiGet(path, schema);
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not-found") return null;
    throw error;
  }
}

/** Customer-facing text for a failed request (forms, toasts). */
export function userMessage(error: unknown, fallback: string): string {
  if (!(error instanceof ApiError)) return fallback;
  switch (error.kind) {
    case "network":
    case "timeout":
      return "We couldn't reach our server. Please check your connection and try again.";
    case "rate-limited":
      return "Too many attempts. Please wait a minute and try again.";
    case "validation":
    case "conflict":
      return error.details[0] ?? "Some details look incorrect. Please check the form.";
    case "unauthorized":
      return error.details[0] ?? "Please sign in again.";
    case "forbidden":
      return "You do not have access to this.";
    default:
      return fallback;
  }
}

/** Build `?a=1&b=2`, skipping empty values. */
export function toQuery(params: Record<string, string | number | null | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}
