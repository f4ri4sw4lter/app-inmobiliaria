import { useState, useEffect } from "react";
import { getListaUsuarios } from "../helpers";

export const useFetchListaUsuarios = () => {
    
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [usuariosIsLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getListaUsuarios()
            .then(({ usuarios }) => {
                console.log(usuarios);
                setListaUsuarios(usuarios);
                setIsLoading(false);
            })
    }, []);
    
    return {
        listaUsuarios,
        usuariosIsLoading
    }
}