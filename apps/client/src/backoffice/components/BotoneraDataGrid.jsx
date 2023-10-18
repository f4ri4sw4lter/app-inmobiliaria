import { Navigate } from "react-router-dom";

export const BotoneraDataGrid = ({ id }) => {

    console.log(id)

    const handleButtonClick = (id, accion) => {
        console.log(id);
        return (

            <Navigate to={`/$accion/$id`} />
        )
    }

    const acciones = ['editar', 'borrar'];

    return (
        <>
        {
        acciones.map(( accion ) => (
            <button
                className="btn"
                onClick={() => handleButtonClick(id, accion)}>
                { accion }
            </button>
        ))
        }
        </>
    );
}
