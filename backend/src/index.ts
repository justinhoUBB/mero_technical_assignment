import express from "express";
import cors from "cors";
import { ReviewController } from "./controller/ReviewController.js";
import { HTTPCodesEnum } from "./models/enums/HTTPCodesEnum.js";
import { Review } from "./models/Review.js";
import { validateOrReject} from "class-validator";
import { AppCodes } from "./models/enums/AppCodes.js";

const app = express();
const reviewController = ReviewController.getInstance();

app.listen(8080);;
app.use(express.json());
app.use(cors());

app.get('/getReviews', (request, response) => {
    console.log("Request received", request);
    const reviewsList: Review[] = reviewController.getReviews();
    response.status(HTTPCodesEnum.OK).json(reviewsList);
});

app.post('/saveReview', async (request, response) => {
    console.log("Request received", request);
    const review = new Review(request.body);
    try {
        await validateOrReject(review);
        reviewController.addReview(review);
        response.status(HTTPCodesEnum.CREATED).send("Review created successfully");
    } catch (error) {
        const errorMessage = error?.message || "Invalid payload";
        console.error(`${errorMessage} [${AppCodes.E0002}]`);
        response.status(HTTPCodesEnum.BAD_REQUEST).json({ message: errorMessage, appCode: AppCodes.E0002 });
    }
});

app.put('/updateReview', async (request, response) => {
    console.log("Request received");
    const review = new Review(request.body);
    try {
        await validateOrReject(review);
        reviewController.updateReview(review);
        response.status(HTTPCodesEnum.OK).send("Review updated successfully");
    } catch (error) {
        const errorMessage = error?.message || "Invalid payload";
        const errorAppCode = error?.name || AppCodes.E0002;
        console.error(`${errorMessage} [${errorAppCode}}]`);
        response.status(HTTPCodesEnum.BAD_REQUEST).json({ message: errorMessage, appCode: errorAppCode });
    }
});
