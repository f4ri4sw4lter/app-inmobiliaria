import { Schema } from "mongoose"

export const DocumentoSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true
    }
})