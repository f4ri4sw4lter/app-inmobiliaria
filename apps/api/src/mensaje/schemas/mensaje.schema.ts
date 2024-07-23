import { Schema } from "mongoose";

export const MensajeSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    asunto: {
        type: String,
        required: false
    },
    mensaje: {
        type: String,
        required: false
    },
    propiedad: {
        type: String,
        required: false
    },
    noLeido: {
        type: String,
        required: true,
        default: true
    },
    lector: {
        type: String,
        required: false,
        default: ''
    }
});