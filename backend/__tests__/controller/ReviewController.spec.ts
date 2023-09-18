import { ReviewController } from "../../src/controller/ReviewController";
import { describe, it, expect } from "vitest";
import { IReview, Review } from "../../src/models/Review";
import { v4 as uuid } from "uuid";

describe("ReviewController - unit tests", () => {
    
    const reviewController = ReviewController.getInstance();
    const randomId = uuid();

    const reviewData: IReview =  {
        rating: 4,
        fullName: "Jake Smith",
        text: "good stuff",
        id: "23ca833c-5256-11ee-be56-0242ac120002"
    };

    it("singleton pattern -> should return the already existing reviewController instance", () => {
        expect(ReviewController.getInstance()).toBe(reviewController);
    });

    it("getReviews - should return all reviews", () => {
        const allReviews = reviewController.getReviews();
        expect(allReviews.length).toBe(8);
        expect(allReviews[0]).toBeInstanceOf(Review);
    });

    it("addReview - should add a new review to the reviews list", () => {
        const reviewData: IReview = {
            rating: 3,
            fullName: "John Johnson",
            text: "Good stuff"
        };

        const reviewToBeAdded = new Review(reviewData);
        reviewController.addReview(reviewToBeAdded);

        const allReviews = reviewController.getReviews();
        expect(allReviews.length).toBe(9);
        expect(allReviews[8]).toEqual(reviewToBeAdded);
    });

    it("findReview - should find & return a review for the given id", () => {
        const result = reviewController.findReview(reviewData.id as string);
        expect(result).toEqual(reviewData);
    });

    it("findReview - should return undefined when id not found", () => {
        const result = reviewController.findReview(randomId);
        expect(result).toBeUndefined();
    });

    it("updateReview - should update an existing review successfully", () => {
        const newText = "Their services are horrible";
        reviewController.updateReview(new Review({ ...reviewData, text: newText }));
        expect(reviewController.findReview(reviewData.id as string)?.text).toEqual(newText);
    });

    it("updateReview - should throw error when an id that has no corresponding review is provided", () => {
        const reviewToBeUpdated = new Review({ ...reviewData, id: randomId });
        const expectedError = new Error("Invalid update request - could not find review");
        expect(() => reviewController.updateReview(reviewToBeUpdated)).toThrowError(expectedError);
    });

});
