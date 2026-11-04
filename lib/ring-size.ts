/** Inner diameter in mm for a US ring size (standard linear approximation). */
export function usSizeToDiameterMm(usSize: number) {
  return 11.63 + 0.8128 * usSize;
}

/** Inner circumference in mm for a US ring size. */
export function usSizeToCircumferenceMm(usSize: number) {
  return Math.PI * usSizeToDiameterMm(usSize);
}

export type RingSizeRow = {
  us: number;
  diameterMm: string;
  circumferenceMm: string;
  eu: number;
};

/** Ring size chart rows in half-size steps (quarter sizes are available on order). */
export function getRingSizeChart(from = 3, to = 14, step = 0.5): RingSizeRow[] {
  const rows: RingSizeRow[] = [];
  for (let us = from; us <= to; us += step) {
    const circumference = usSizeToCircumferenceMm(us);
    rows.push({
      us,
      diameterMm: usSizeToDiameterMm(us).toFixed(1),
      circumferenceMm: circumference.toFixed(1),
      eu: Math.round(circumference),
    });
  }
  return rows;
}
