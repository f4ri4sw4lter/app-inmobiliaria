import { Schema } from "mongoose";

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
        type: String,
        required: true
    },
	telefono: {
        type: String,
        required: false
    },
	ubicacion:{
        provincia: {
            type: String,
            required: true
        },
        municipio: {
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
    fechaNacimiento: {
        type: Date,
        required: true
    },
	genero: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
    
});

