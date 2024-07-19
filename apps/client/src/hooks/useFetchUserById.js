import { useState, useEffect } from "react";
import { getUserById } from "../helpers";

export const useFetchUserById = (id) => {
    
    const [user, setUser] = useState([]);
    const [userIsLoading, setIsLoading] = useState( true );

    const fetchUser = async (id) => {

        if(id != null && id != undefined){

            try{
                getUserById(id)
                .then(({ user }) => {
                    setUser(user);
                    setIsLoading(false);
                })
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        fetchUser(id);
    }, []);
    
    return {
        user,
        userIsLoading,
        fetchUser
    }
}