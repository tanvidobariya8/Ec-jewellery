export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavItem[];
};

export type HeroSlide = {
  id: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  cta: NavItem;
  imageLabel: string;
};

export type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  author: string;
  product?: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

/** A titled block of paragraphs. Used by blog posts, policies and guides. */
export type ContentSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  readingMinutes: number;
  sections: ContentSection[];
};

export type PolicyPage = {
  slug: string;
  title: string;
  summary: string;
  sections: ContentSection[];
};

export type TeamGroup = {
  title: string;
  description: string;
};

export type Office = {
  country: string;
  city: string;
  role: string;
};
