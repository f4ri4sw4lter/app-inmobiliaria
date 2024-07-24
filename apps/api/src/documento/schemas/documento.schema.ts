import { Schema } from "mongoose"

export const DocumentoSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    }
})