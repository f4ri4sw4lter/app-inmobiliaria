/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";

export const RolSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false
    }
);