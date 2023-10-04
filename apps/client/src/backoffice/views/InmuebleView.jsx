import { useFetchInmuebleById } from "../hooks/useFetchInmuebleById"

export const InmuebleView = (id) => {

    const { inmueble, isLoading } = useFetchInmuebleById(id);

    return (
        <>
            {console.log(inmueble)}
        </>
    )
}
