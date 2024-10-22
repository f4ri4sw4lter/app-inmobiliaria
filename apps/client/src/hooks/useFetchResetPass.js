import { useState, useEffect } from "react";
import { recuperarPassword } from "../helpers";

export const useFetchResetPass = ( ) => {
    
    const [respMail, setMail] = useState('');
    const [isLoadingMail, setIsLoading] = useState( true );

    const recuperarPass = async (mail) => {

        try{

            const resp = await recuperarPassword(mail)
            if(resp.status == 200) {

                setMail(resp)
                setIsLoading(false)

            } else {

                setMail({error: 400})

            }

        } catch (err) {
            setMail({error: 400})
            setIsLoading(false)
        }
    }
    
    return {
        respMail,
        isLoadingMail,
        recuperarPass
    }
}