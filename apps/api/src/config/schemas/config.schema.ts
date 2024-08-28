import { Schema } from "mongoose";

export const ConfigSchema = new Schema({
    unreadMsgs: {
        type: Boolean,
        required: false
    }
})