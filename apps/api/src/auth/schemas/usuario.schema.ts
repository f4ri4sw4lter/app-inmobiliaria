/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";
//import { RolSchema } from "./rol.schema";

export type role = {
	name: string;
	level: string;
}

export const UsuarioSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: false
    },
    role:{
        name:{
            type: String,
            required: true
        },
        level:{
            type: Number,
            required: true
        }
    }
});
