import { Link } from "@mui/material";
import Button from '@mui/material/Button';
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export const BotoneraDataGrid = ({ inmueble }) => {

    const acciones = ['ver', 'editar', 'borrar'];

    return (
        <>
            {
                acciones.map((accion) => (
                    <NavLink to={`/inmueble/${accion}/${inmueble._id}`} className='nav-item nav-link' key={accion}>
                        <Button
                            className="btn"
                            variant="contained"
                            size="small"
                            sx={{ ml: -3 }}
                        >
                            {accion}
                        </Button>
                    </NavLink>
                ))
            }
        </>
    );
}

/*<Button
                className="btn"
                variant="contained"
                size="small"
                sx={{mr:1}}
                key={accion}
                onClick={() => handleButtonClick(inmueble.id, accion)}
                >
                    { accion }
                </Button> */
