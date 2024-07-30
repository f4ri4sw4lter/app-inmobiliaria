import { Document } from "mongoose";

export interface Contrato extends Document {
	inmueble: string;
    propietario: string;
	cliente: string;
	empleado: string;
	fecha?: Date;
	detalle?: string;
    readonly createdAt?: Date;
}