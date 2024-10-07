export interface Review {
  creationDate: string;
  criticName: string;
  criticPictureUrl: string;
  criticPageUrl: string;
  reviewState: "fresh" | "rotten";
  isFresh: boolean;
  isRotten: boolean;
  isRtUrl: boolean;
  isTopCritic: boolean;
  publicationUrl: string;
  publicationName: string;
  reviewUrl: string;
  quote: string;
  reviewId: string;
  originalScore: string;
  scoreSentiment: "POSITIVE" | "NEGATIVE";
  sentiment?: number;
}
