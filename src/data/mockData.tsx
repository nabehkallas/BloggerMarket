export interface Blogger {
  id: number;
  name: string;
  description: string;
  picture: string;
  basePricePerVideo: number;
  multiplier: number;
}

export interface SpecialOffer {
  id: number;
  name: string;
  description: string;
  bloggerIds: number[];
  picture: string;
  fixedPrice: number;
}
