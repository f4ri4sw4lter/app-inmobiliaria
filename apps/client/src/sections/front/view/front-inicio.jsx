import { getListaInmuebles } from "../../../helpers"
import { useFetchInmuebleById } from "../../../hooks/useFetchInmueblesById";

import styles from '../css/styles.module.css'

export default function FrontInicioView() {

    const { inmuebles } = getListaInmuebles();

    return(
        <body className={styles.body}>
            <h1>INICIO</h1>
            
        </body>
    )    
}