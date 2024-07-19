import { Document } from "mongoose";

export interface Mensaje extends Document {
    nombre: string;
    apellido: string;
    ciudad: string;
    telefono: string;
    correo: string;
    asunto: string;
    mensaje: string;
    propiedad: string;
}