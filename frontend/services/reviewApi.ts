import axios, { AxiosInstance } from 'axios';
import { Resource } from '../models/enums/resource';
import { IReview } from '../models/iReview';

export class ReviewService {
    private axiosInstance: AxiosInstance;
    private static instance: ReviewService;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_REVIEW_BASE_API_URL
        });
    }

    static getInstance() {
        if (!ReviewService.instance) {
            ReviewService.instance = new ReviewService();
        }
        return ReviewService.instance;
    }

    public async getReviews() {
        const response = await this.axiosInstance.get(Resource.GET_REVIEWS_ENDPOINT);
        return response;
    }

    public async saveReview(review: IReview) {
        const response = await this.axiosInstance.post(Resource.SAVE_REVIEW_ENDPOINT, review);
        return response;
    }

    public async updateReview(review: IReview) {
        const response = await this.axiosInstance.put(Resource.UPDATE_REVIEW_ENDPOINT, review);
        return response;
    }
}
