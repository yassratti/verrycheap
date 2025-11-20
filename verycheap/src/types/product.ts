export interface ProductData {
  title: string;
  price: string; // formatted price string e.g. "$30/yearly"
  originalPrice: string; // formatted original price
  discount?: string;
  imageSrc?: string;
  imageAlt?: string;
  pricePerYear?: number;
  originalPriceValue?: number;
}

export default ProductData;
