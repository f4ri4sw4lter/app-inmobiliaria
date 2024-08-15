import { Document } from "mongoose";

export interface Contrato extends Document {
	inmueble: any;
    propietario: any;
	cliente: any;
	empleado: string;
	fecha?: Date;
	detalle?: string;
    readonly createdAt?: Date;
}