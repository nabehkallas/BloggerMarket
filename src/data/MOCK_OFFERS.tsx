
import { SpecialOffer } from "./mockData";
export const MOCK_OFFERS: SpecialOffer[] = [
 { id: 1, name: "Christmass Offer",description:"two videos for each blogger through 30 days", picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [1,2], fixedPrice: 250 },
  { id: 2, name: "New Year Offer", description:"two videos for each blogger through 30 days",picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [2,3], fixedPrice: 300 },
  { id: 3, name: "Lucky Offer",description:"two videos for each blogger through 30 days",picture: require('../../assets/SpecialOffer.avif'), bloggerIds: [1,4], fixedPrice: 400 },
];