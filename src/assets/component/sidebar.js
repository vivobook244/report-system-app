import React from "react";
import { Button, Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pp from "../../assets/image/Administrator_Male.png";
import { clearsession } from "../../routes/checkAuth"
import { useNavigate } from "react-router-dom";


export default function Sidabar(props){

    const navigations = props.itemMenu
    let redirect = useNavigate();

    return  <div className=" py-3 rounded-3 w-100 h-100 bg-light" 
        style={{
            height: window.innerHeight,
        }} 
    >
                <Card style={{ 
                        width: '90%',
                        backgroundColor: "#9AD0EC",
                        borderRadius:"15px"
                    }}  className="mx-auto" >
                    <Card.Img variant="top" src={Pp} alt="profil" className="w-50 mx-auto" />
                    <Card.Body>
                        <Card.Title>Administrator</Card.Title>
                    </Card.Body>
                </Card>
                <hr />
                    <>
                        {
                            navigations.map(
                                (navigation) =>   
                                <Button href={navigation.to !== "/logout" ? navigation.to : "" } className="w-75 text-start mb-2" 
                                    style={{
                                        backgroundColor: "#9AD0EC",
                                        borderColor: "#ffffff",
                                        borderRadius: "10px",
                                        paddingBottom: "15px",
                                        paddingTop:"15px"
                                    }}

                                    onClick={
                                        ()=>{
                                            if(navigation.to === "/logout"){
                                                if (clearsession()) {
                                                    // console.log(clearsession())
                                                    redirect("/", {replace:true} );
                                                }
                                            }
                                        }
                                    }
                                >
                                    <FontAwesomeIcon icon={navigation.icon} size="1x" className="text-dark me-2" /> 
                                    <span className="align-midle" >
                                        {navigation.name}
                                    </span>
                                </Button>
                            )
                        }
                    </>
            </div>
}