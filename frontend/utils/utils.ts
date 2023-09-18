import { IReview } from "../models/iReview";

export function computeAverageRating(reviewsList: IReview[]) {
    const sumOfAllReviewRatings: number = reviewsList.reduce((accumulator, review) => accumulator + review.rating, 0);
    return (sumOfAllReviewRatings/reviewsList.length).toFixed(2);
}

export const getEnumValueDynamically = (enumObj: any, enumName: string): string => {
    return enumObj[enumName];
}
