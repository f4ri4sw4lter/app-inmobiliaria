/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";

export const RolSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
});