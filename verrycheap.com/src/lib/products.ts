export interface ProductVariant {
  title: string;
  pricePerYear: number;
  originalPrice: number;
  discount: string;
  purchaseLink: string;
}

export interface ProductConfig {
  slug: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  discount: string;
  pricePerYear: number;
  originalPrice: number;
  purchaseLink: string;
  variants?: ProductVariant[]; // Optional variants for the same product
}

export const products: ProductConfig[] = [
  {
    slug: "youtube",
    title: "YouTube Premium",
    imageSrc: "/youtube-banner.png",
    imageAlt: "YouTube Premium",
    discount: "75% OFF",
    pricePerYear: 44.99,
    originalPrice: 168,
    purchaseLink: "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e",
  },
  {
    slug: "spotify",
    title: "Spotify Premium",
    imageSrc: "/spotify-banner.png",
    imageAlt: "Spotify Premium",
    discount: "75% OFF",
    pricePerYear: 39.99,
    originalPrice: 145,
    purchaseLink: "https://buy.stripe.com/9B6eVd4Wue6l45U0gV3840f",
  },
  {
    slug: "crunchyroll",
    title: "Crunchyroll MEGA FAN",
    imageSrc: "/crunchyroll-banner.png",
    imageAlt: "Crunchyroll MEGA FAN",
    discount: "75% OFF",
    pricePerYear: 33.99,
    originalPrice: 124.99,
    purchaseLink: "https://buy.stripe.com/00w3cv9cKaU9fOC1kZ3840g",
  },
  {
    slug: "netflix",
    title: "Netflix Premium",
    imageSrc: "/netflix-banner.png",
    imageAlt: "Netflix Premium",
    discount: "46% OFF",
    pricePerYear: 159.99,
    originalPrice: 300,
    purchaseLink: "https://buy.stripe.com/dRmdR91Ki8M18mae7L3840h",
    variants: [
      {
        title: "Netflix Premium / Monthly",
        pricePerYear: 14.99,
        originalPrice: 25,
        discount: "46% OFF",
        purchaseLink: "https://buy.stripe.com/bJe3cvagOe6lcCq2p33840o", 
      },
      {
        title: "Netflix Standard",
        pricePerYear: 119.99,
        originalPrice: 216,
        discount: "44% OFF",
        purchaseLink: "https://buy.stripe.com/6oUbJ11Ki8M1dGu2p33840p", 
      },
    ],
  },
  {
    slug: "creative-cloud",
    title: "Creative Cloud Pro",
    imageSrc: "/creativecloudlogo3.png",
    imageAlt: "Creative Cloud Pro",
    discount: "55% OFF",
    pricePerYear: 269.99,
    originalPrice: 599.88,
    purchaseLink: "https://buy.stripe.com/cNicN50Ge2nDfOC5Bf3840m",
  },
];

/**
 * Converts a product title to a slug
 * Example: "YouTube Premium" -> "youtube"
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Gets product by slug or title
 */
export function getProductBySlug(slugOrTitle: string): ProductConfig | undefined {
  // First try to find by exact slug match
  const bySlug = products.find((p) => p.slug === slugOrTitle.toLowerCase());
  if (bySlug) return bySlug;
  
  // Then try to find by title match
  const byTitle = products.find((p) => p.title.toLowerCase() === slugOrTitle.toLowerCase());
  if (byTitle) return byTitle;
  
  // Finally try to find by slug after converting title to slug
  const normalizedSlug = slugOrTitle.toLowerCase().replace(/\s+/g, "-");
  return products.find((p) => p.slug === normalizedSlug);
}

/**
 * Gets product slug by title (for backwards compatibility)
 */
export function getSlugByTitle(title: string): string {
  const product = products.find((p) => p.title === title);
  return product?.slug || titleToSlug(title);
}

/**
 * Gets product URL by title
 * First tries to find exact title match, then converts to slug
 */
export function getProductUrl(title: string): string {
  const product = products.find((p) => p.title === title);
  if (product) {
    return `/${product.slug}`;
  }
  // Fallback: try to match by slug
  const slugMatch = products.find((p) => p.slug === title.toLowerCase());
  if (slugMatch) {
    return `/${slugMatch.slug}`;
  }
  // Last resort: convert title to slug
  return `/${titleToSlug(title)}`;
}
