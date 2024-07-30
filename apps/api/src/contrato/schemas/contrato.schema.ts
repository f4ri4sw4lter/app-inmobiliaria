import { Schema } from "mongoose";

export const ContratoSchema = new Schema({
    inmueble: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    empleado: {
        type: String,
        required: true
    },
    fecha: {
        type:Date,
        default: Date.now
    },
    detalle: {
        type: String,
        required: false
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
    
});

