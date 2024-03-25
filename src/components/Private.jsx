import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import (UserContext)

export default function Private(props)
{

    const loggedData = useContext(UserContext);

    return (

        loggedData.loggedUser!==null?
        <props.Component/>
        :
        <Navigate to="/login"/>


    )

}