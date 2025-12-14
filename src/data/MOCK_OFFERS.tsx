
import { SpecialOffer } from "./mockData";
export const MOCK_OFFERS: SpecialOffer[] = [
 { id: 1, name: "Offer1", picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [1,2], fixedPrice: 250 },
  { id: 2, name: "Offer2", picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [2,3], fixedPrice: 300 },
  { id: 3, name: "Offer3", picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [1,4], fixedPrice: 400 },
];