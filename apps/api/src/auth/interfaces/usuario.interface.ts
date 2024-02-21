/**
 * Manera de describir los datos para typescript.
 */
import { Document } from "mongoose";

export type role = {
	name: string;
	level: string;
}
export interface Usuario extends Document {
    username: string;
    lastname: string;
    password: string;
    role: role;
    id: number;
}
