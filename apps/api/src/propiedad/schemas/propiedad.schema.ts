/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";
import { ubicacion, equipamiento } from "../interfaces/propiedad.interface";

export const PropiedadSchema = new Schema({
    propietario:{
        type: Number,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
	descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    cant_amb: {
        type: Number,
        required: true
    },
    cant_ba: {
        type: Number,
        required: true
    },
    cant_hab: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagenes: {
        type: [String],
        required: false
    },
    ubicacion:{
        provincia: {
            type: String,
            required: true
        },
        ciudad: {
            type: String,
            required: true
        },
        calle: {
            type: String,
            required: true
        },
        altura: {
            type: Number,
            required: true
        }
    },
    equipamientos:{
        type: [String],
        required: false
    },
	estado: {
        type: String,
        required: true
    },
    cliente: {
        type: Number,
        required: false
    },
	contrato: {
        type: String,
        required: false
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

