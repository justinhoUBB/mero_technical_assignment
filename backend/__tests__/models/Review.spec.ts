import { validateOrReject } from "class-validator";
import { IReview, Review } from "../../src/models/Review";
import { describe, it, expect } from "vitest";

describe("Review class - unit tests", () => {

    const reviewData: IReview = {
        rating: 3,
        fullName: "John Johnson",
        text: "Good stuff"
    };

    it("should create a new Review instance, should set a random value for id if not provided", () => {
        const review = new Review(reviewData);
        expect(review).toBeInstanceOf(Review);
        expect(review.id).toBeDefined();
    });

    it("should validate successfully", async () => {
        const review = new Review(reviewData);
        await expect(validateOrReject(review)).resolves.toBeUndefined();
    });

    it("should fail the validation when using rating > 5", async () => {
        const invalidReviewData = { rating: 456 };
        const review = new Review(invalidReviewData);
        await expect(validateOrReject(review)).rejects.toBeDefined();
    });

});
