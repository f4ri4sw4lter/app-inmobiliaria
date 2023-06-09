/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";
import { RolSchema } from "./rol.schema";

export const UsuarioSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[{
        ref: RolSchema,
        Type: Schema.Types.ObjectId
    }]},
    {
        timestamps: true,
        versionKey:false
    }
);