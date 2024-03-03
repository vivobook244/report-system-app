import React,{useEffect} from "react";
import { clearsession } from "../../routers/checkAuth"
import { useNavigate } from "react-router-dom";

export default function Logout() {

    let redirect = useNavigate();

    const logout =() =>{
        // clearsession()
        if (clearsession()) {
            // console.log(clearsession())
            redirect("../", {replace:true} );
        }
    }

    useEffect(() => {
        logout();
        
    });

    return (

        <>
        </>

    );

}