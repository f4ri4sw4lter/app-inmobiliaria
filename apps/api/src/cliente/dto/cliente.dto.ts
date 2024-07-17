/**
 * DTO se utiliza para definir la estructura de los datos 
 * que se envian entre el servidor y el cliente.
 */

import { ubicacion } from "../interfaces/cliente.interface";

export interface CreateClienteDTO {
	readonly dni: number;
    nombre: string;
	apellido: string;
	correo?: string;
	celular?: string;
	telefono?: string;
	ubicacion: ubicacion;
    readonly createdAt?: Date;
}