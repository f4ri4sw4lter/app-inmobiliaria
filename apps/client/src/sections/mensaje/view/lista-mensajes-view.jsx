import { Stack, Typography } from '@mui/material';
import { useFetchListaMensajes } from '../../../hooks/useFetchListaMensajes';
import MensajeCard from '../mensaje-card';

export default function ListaMensajesView(noLeidos) {

    const { listaMensajes, isLoadingMensajes, fetchMensajes } = useFetchListaMensajes(noLeidos);

    return (
        <>
            {
                !isLoadingMensajes &&
                listaMensajes.map((mensaje) => (
                    <MensajeCard
                        key={mensaje._id}
                        nombre={mensaje.nombre}
                        apellido={mensaje.apellido}
                        ciudad={mensaje.ciudad}
                        telefono={mensaje.telefono}
                        correo={mensaje.correo}
                        asunto={mensaje.asunto}
                        mensaje={mensaje.mensaje}
                        propiedad={mensaje.propiedad}
                        noLeido={mensaje.noLeido}
                        lector={mensaje.lector}
                        id={mensaje._id}
                        fetchMensajes={fetchMensajes}
                    />
                ))
            }
        </>
    )
}