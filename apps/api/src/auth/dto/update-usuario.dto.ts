export type role = {
	name: string;
	level: string;
}
export class UpdateUsuarioDTO{
    name: string;
    lastname: string;
    email: string;
    role: role;
}