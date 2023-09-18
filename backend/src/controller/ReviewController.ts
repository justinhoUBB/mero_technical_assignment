import { Review } from "../models/Review.js";
import { default as staticReviewsData } from "../json/reviews.json" assert { type: "json" };
import { AppCodes } from "../models/enums/AppCodes.js";

export class ReviewController {

    private reviewsList: Review[] = [];

    private static instance: ReviewController;

    static getInstance(): ReviewController {
        if (!ReviewController.instance) {
            ReviewController.instance = new ReviewController();
            ReviewController.instance.loadReviews();
        }
        return ReviewController.instance;
    }

    private loadReviews(): void {
        staticReviewsData.forEach((review) => {
            this.reviewsList.push(new Review(review));
        });
    }

    public getReviews(): Review[] {
        return this.reviewsList;
    }
    
    public addReview(review: Review): void {
        this.reviewsList.push(review);
    }

    public findReview(id: string): Review | undefined {
        return this.reviewsList.find(review => review.id === id);
    }

    public updateReview(review: Review): void {
        const reviewToBeUpdated = this.findReview(review.id);
        if (reviewToBeUpdated) {
            const indexOfReviewToBeUpdated = this.reviewsList.indexOf(reviewToBeUpdated);
            this.reviewsList[indexOfReviewToBeUpdated] = review;
        }
        else {
            console.error("Invalid update request - could not find review", AppCodes.E0001);
            const errorObject = new Error("Invalid update request - could not find review")
            errorObject.name = AppCodes.E0001;
            throw errorObject;
        }
    }
}
