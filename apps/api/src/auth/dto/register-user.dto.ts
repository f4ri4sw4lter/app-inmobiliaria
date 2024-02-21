export type role = {
	name: string;
	level: string;
}
export class ResgiterUserDTO{
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: role;
}