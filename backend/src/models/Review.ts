import { IsOptional, IsString, Min, Max, IsInt, IsUUID  } from "class-validator";
import { v4 as uuid } from "uuid";

export interface IReview {
    rating: number;
    fullName?: string;
    text?: string;
    id?: string;
}

export class Review {
    constructor(review: IReview) {
        this.rating = review.rating;
        this.fullName = review.fullName;
        this.text = review.text;
        this.id = review.id || uuid();
    }

    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    fullName: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsUUID()
    id: string;
}

