/**
 * Manera de describir los datos para typescript.
 */
import { Document } from "mongoose";


export interface Usuario extends Document {
    username: string;
    email: string;
    password: string;
}
