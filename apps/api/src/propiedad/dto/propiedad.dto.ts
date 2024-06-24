/**
 * DTO se utiliza para definir la estructura de los datos 
 * que se envian entre el servidor y el cliente.
 */

import { ubicacion, equipamiento } from "../interfaces/propiedad.interface";

/**
 * TODO: Acomodar contrato.
 */
export interface CreatePropiedadDTO {
	propietario: number;
	titulo: string;
	descripcion: string;
	tipo: string;
	cant_amb: number;
	cant_ba: number;
	cant_hab: number;
	precio: number;
	ubicacion: ubicacion;
	equipamientos?: equipamiento[];
	estado: string;
	cliente?: number;
	contrato?: any;
    readonly createdAt?: Date;
}

export interface UpdatePropiedadDTO {
	propietario?: number;
	titulo?: string;
	descripcion?: string;
	tipo?: string;
	cant_amb?: number;
	cant_ba?: number;
	cant_hab?: number;
	precio?: number;
	ubicacion?: ubicacion;
	equipamientos?: equipamiento[];
	estado?: string;
	cliente?: number;
	contrato?: any;
}