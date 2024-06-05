import { Schema } from "mongoose";

export const ImagesSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    propiedadId: {
        type: String,
        required: true
    }
});