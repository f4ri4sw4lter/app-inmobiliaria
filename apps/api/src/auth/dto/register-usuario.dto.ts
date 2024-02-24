export type role = {
	name: string;
	level: string;
}
export class RegisterUsuarioDTO{
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: role;
}