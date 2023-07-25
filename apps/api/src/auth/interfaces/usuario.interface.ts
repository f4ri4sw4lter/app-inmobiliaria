/**
 * Manera de describir los datos para typescript.
 */
import { Document } from "mongoose";


export interface Usuario extends Document {
    username: string;
    password: string;
    role: string;
    id: number;
}
