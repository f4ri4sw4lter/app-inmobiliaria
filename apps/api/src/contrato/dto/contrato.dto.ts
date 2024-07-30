export interface CreateContratoDTO {
	inmueble: string;
    propietario: string;
	cliente: string;
	empleado: string;
	fecha?: Date;
	detalle?: string;
    readonly createdAt?: Date;
}