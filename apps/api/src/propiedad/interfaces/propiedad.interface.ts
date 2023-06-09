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

export type equipamiento = {
	nombre: string;
}

/**
 * TODO: Acomodar contrato.
 */
export interface Propiedad extends Document {
	readonly propietario: number;
    titulo: string;
	descripcion: string;
	readonly tipo: string;
	cant_amb: number;
	cant_ba: number;
	cant_hab: number;
	precio: number;
	imagenes?: string[];
	ubicacion: ubicacion;
	equipamientos?: equipamiento[];
	estado: string;
	cliente?: number;
	contrato?: any;
    readonly createdAt?: Date;
}