/**
 * Manera de describir los datos para typescript.
 */
import { Document } from "mongoose";

export type ubicacion = {
	mapa: string;
	provincia: string;
	municipio: string;
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
	propietario: string;
    titulo: string;
	descripcion: string;
	readonly tipo: string;
	cant_amb: number;
	cant_ba: number;
	cant_hab: number;
	precio: number;
	precioUSD: number;
	ubicacion: ubicacion;
	equipamientos?: equipamiento[];
	estado: string;
	cliente?: number;
	contrato?: any;
	activo?: boolean;
	destacado?: boolean;
	mascotas: boolean;
	cochera: boolean;
	superficie: number;
	infantes: boolean;
    readonly createdAt?: Date;
}