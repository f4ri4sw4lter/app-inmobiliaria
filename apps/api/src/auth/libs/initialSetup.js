import { RolSchema } from '../schemas/rol.schema';

export const createRoles = async () => {
    try {
        const count = RolSchema.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new RolSchema({name: 'usuario'}).save(),
            new RolSchema({name: 'moderador'}).save(),
            new RolSchema({name: 'admin'}).save()
        ]);
    } catch (error) {
        console.log(error);
    }
};