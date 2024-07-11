/**
 * Manera de describir los datos para typescript.
 */
import { Document } from "mongoose";

export type ubicacion = {
	provincia: string;
	ciudad: string;
	calle: string;
	altura: number;
}

export interface Cliente extends Document {
	readonly dni: number;
    nombre: string;
	apellido: string;
	correo: string;
	celular: string;
	telefono: string;
	ubicacion: ubicacion;
    readonly createdAt?: Date;
}