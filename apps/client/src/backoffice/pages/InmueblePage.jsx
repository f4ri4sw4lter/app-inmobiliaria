import { useParams } from "react-router-dom";
import { InmuebleView } from "../views/InmuebleView"
import { BackofficeLayout } from "../layout/BackofficeLayout";

export const InmueblePage = ({ page }) => {

    const { id } = useParams();

    return (
        <BackofficeLayout>
            { page=='ver' ? <InmuebleView id={id}/> : <InmuebleEdit id={id}/>}
        </BackofficeLayout>
    )
}
