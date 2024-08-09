export interface CreateContratoDTO {
	inmueble: any;
    propietario: any;
	cliente: any;
	empleado: string;
	fecha?: Date;
	detalle?: string;
    readonly createdAt?: Date;
}