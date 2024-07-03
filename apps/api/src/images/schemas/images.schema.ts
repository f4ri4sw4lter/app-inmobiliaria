import { Schema } from "mongoose";

export const ImagesSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true
    }
});