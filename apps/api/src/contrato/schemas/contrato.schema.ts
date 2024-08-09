import { Schema } from "mongoose";

export const ContratoSchema = new Schema({
    inmueble: {
        type: Object,
        required: true
    },
    propietario: {
        type: Object,
        required: true
    },
    cliente: {
        type: Object,
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

