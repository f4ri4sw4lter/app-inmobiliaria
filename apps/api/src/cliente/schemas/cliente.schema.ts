/**
 * Modelamos los datos para la coleccion de MongoDB.
 */

import { Schema } from "mongoose";
import { ubicacion } from "../interfaces/cliente.interface";

export const ClienteSchema = new Schema({
    dni: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
	apellido: {
        type: String,
        required: true
    },
	correo: {
        type: String,
        required: true
    },
	celular: {
        type: Number,
        required: true
    },
	telefono: {
        type: Number,
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
    createdAt: {
        type:Date,
        default: Date.now
    }
    
});
