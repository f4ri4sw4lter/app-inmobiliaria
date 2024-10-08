import { Document } from "mongoose";

export interface Config extends Document {
    unreadMsgs: boolean;
}