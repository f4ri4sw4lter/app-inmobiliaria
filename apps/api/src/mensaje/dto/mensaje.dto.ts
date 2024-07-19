export interface CreateMensajeDTO {
    nombre: string;
    apellido: string;
    ciudad?: string;
    telefono?: string;
    correo?: string;
    asunto?: string;
    mensaje?: string;
    propiedad?: string;
}