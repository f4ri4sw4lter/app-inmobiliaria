import { useParams } from "react-router-dom";
import { InmuebleView } from "../views/InmuebleView"
import { BackofficeLayout } from "../layout/BackofficeLayout";

export const InmueblePage = () => {

    const { id } = useParams();

    return (
        <BackofficeLayout>
            <InmuebleView id={id}/>
        </BackofficeLayout>
    )
}
