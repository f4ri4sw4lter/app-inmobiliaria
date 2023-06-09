/**
 * DTO se utiliza para definir la estructura de los datos 
 * que se envian entre el servidor y el cliente.
 */


export interface CreateUsuarioDTO {
	username: string;
    email: string;
    password: string;
}