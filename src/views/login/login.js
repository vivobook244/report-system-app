import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../assets/style/styles.module.css'
import FailedAuthModal from "../../assets/component/failedAuthModal";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { checkSession } from "../../routers/checkAuth"
import { storeData } from "../../localStorage/index.js"
import { retrieveData } from "../../localStorage/index.js";



export default function Login(props) {

    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    let redirect = useNavigate();

    const restoreSession = () => {
        if (checkSession()) {
            const token = retrieveData("TOKEN")
            console.log("restore session")
            console.log(token)

            api.get("/account-access-web",
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            ).then(
                (res) => {
                    console.log(res.data)
                    if (res.data.Code === 400) {
                        setShowModal(true)
                        setErrorMessage(res.data.message)
                        setLoading(false)
                    } else if (res.data.Code === 201) {
                        storeData("TOKEN", res.data.message.token);
                        storeData("DATAUSER", JSON.stringify(res.data.message.dataUser));
                        redirect("../home", { replace: true });
                    }
                }
            ).catch(error => {
                setLoading(false)
                console.log(error)
                console.log("error sign in")
                setShowModal(true)
                setErrorMessage(error.code)
                
            })
        }
    }

    useEffect(() => {
        restoreSession()
    });

    const handleButtonlogin = () => {
        setLoading(true)

        api.post("/auth-web",
            {
                user: username,
                pass: password,
            }
        ).then(res => {
            console.log(res.data)
            if (res.data.Code === 400) {
                setShowModal(true)
                setErrorMessage(res.data.message)
                setLoading(false)
            } else if (res.data.Code === 201) {
                storeData("TOKEN", res.data.message.token);
                storeData("DATAUSER", JSON.stringify(res.data.message.dataUser));
                redirect("../home", { replace: true });
            }
        }).catch(error => {
            setLoading(false)
            console.log(error)
            console.log("error sign in")
            setShowModal(true)
            setErrorMessage(error.code)
        })


    };

    const handleUsername = (event) => {
        event.persist();
        let value = event.target.value
        setUsername(value);
    }

    const handlePassword = (event) => {
        event.persist();
        let value = event.target.value
        setPassword(value);
    }
   
    return (
        <Container fluid >
            <FailedAuthModal

                show={showModal}
                onHide={() => setShowModal(false)}
                message={errorMessage}

            />
            
            <Row className="justify-content-center align-items-center">
                <Col xl={3} lg={4} md={6} sm={10} >
                    <div className={styles.BoxLogin} >
                        <p href="#" className={styles.tulisanLogin}>Welcome</p>
                        <Form.Floating className="mb-3 mt-5 ">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="Email"
                                onChange={handleUsername}
                            />
                            <label htmlFor="floatingInputCustom">Username</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                                onChange={handlePassword}
                            />
                            <label htmlFor="floatingPasswordCustom">Password</label>
                        </Form.Floating>
                        <Button
                            href="#" className={styles.tombolLogin}
                            disabled={isLoading}
                            onClick={!isLoading ? handleButtonlogin : null}
                        >
                            {  'Login'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )


}