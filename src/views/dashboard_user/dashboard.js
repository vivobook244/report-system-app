import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button, Stack, ListGroup, Tab, Collapse, Modal, Form, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BodyTimeline from "../../assets/component/bodyTimeline";
import navigation_user from "../../routers/navigations_user";
import navigation_administrator from "../../routers/navigation_administrator";
// import styles from '../../assets/style/styles.module.css';
// import Sidabar from "../../assets/component/sidebar";
// import { checkSession } from "../../routes/checkAuth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { retrieveData } from '../../localStorage'
import FailedAuthModal from "../../assets/component/failedAuthModal";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Dashboard(props) {

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [usersall, setUsersall] = useState([])
    const [nav, setNav] = useState("")
    const [conversations, setConversations] = useState([])
    const [showModal, setShowModal] = useState(false);
    const identity = retrieveData("DATAUSER")
    const [errorMessage, setErrorMessage] = useState("");
    let redirect = useNavigate()
    let users = JSON.parse(identity)

    const getConversations = () => {
        let ident = JSON.parse(identity)
        const userToken = retrieveData("TOKEN")
        api.post("/get-data-conversations-web",
            {
                id: ident.id,
                username: ident.username
            },
            {
                headers: {
                    'x-auth-token': userToken
                },
            }
        ).then(
            (res) => {
                console.log(res.data)
                if (res.data.Code === 401) {
                    console.log(res.data.message)
                } else if (res.data.Code === 201) {
                    console.log(res.data.message)
                    setConversations(res.data.message)
                } else if (res.data.Code === 400) {
                    console.log(res.data.message)
                    setConversations(res.data.Code)
                }
            }

        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    const sendReport = () => {
        const userToken = retrieveData("TOKEN")
        let ident = JSON.parse(identity)
        const comment = document.getElementById("commentReport");
        const filesReport = document.getElementById("fileReport");
        const reciever = document.getElementById("reciever");

        const date = new Date()

        const hour = date.getHours()
        const minutes = date.getMinutes()
        const times = `${hour}.${minutes}`
        const day = date.getDay()
        const dates = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const dateTostring = `${dates}-${month}-${year} ${times}`

        const formData = new FormData();

        formData.append("sender", ident.username)

        ident.type == "koordinator" ? formData.append("reciever", reciever.value) : formData.append("reciever", "koordinator")
        formData.append("message", comment.value)
        formData.append("date", dateTostring)

        
        if (typeof (filesReport.files[0]) !== "undefined") {
            formData.append("files", filesReport.files[0]);
            // return console.log(filesReport.files[0])
        }

        api.post("/send-data-report-web", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'x-auth-token': userToken
            }
        }
        ).then((res) => {
            console.log(res.data)
            if (res.data.Code === 401) {
                setShow(false)
                setShowModal(true)
                setErrorMessage(res.data.message)
                document.getElementById("sendNewreport").reset()
            } else if (res.data.Code === 201) {
                setShow(false)
                setShowModal(true)
                setErrorMessage(res.data.message)
                document.getElementById("sendNewreport").reset()

            }
        }).catch(err => {
            console.log(err)
            // return ToastAndroid.show("error",ToastAndroid.LONG,ToastAndroid.CENTER);
            // console.log(err.message)
            setShow(false)
            setShowModal(true)
            setErrorMessage(err.code+"kjhkjhkjh")
            document.getElementById("sendNewreport").reset()
        })
    }

    const getUser = () => {

        const userToken = retrieveData("TOKEN")
        api.get("/get-data-users-web",
            {
                headers: {
                    'x-auth-token': userToken
                },
            }
        ).then(
            (res) => {
                console.log(res.data)
                if (res.data.Code === 401) {
                    console.log(res.data.message)
                } else if (res.data.Code === 201) {
                    console.log(res.data.message)
                    setUsersall(res.data.message)
                }
            }

        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }


    useEffect(() => {
        getConversations()
        getUser()
    }, [])

    useEffect(
        () => {
            if (identity == null) {
                redirect("../", { replace: true });
            }
            console.log(identity)
            let ident = JSON.parse(identity)
            console.log(ident.type)
            if (ident.type == "koordinator") {
                setNav(navigation_administrator)
                console.log(nav)
            }

            if (ident.type == "mahasiswa") {
                setNav(navigation_user)
                console.log(nav)
            }


        }

    )



    return (
        <Container fluid >
       
            <Navbar >
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-2 fw-semibold">
                    Sistem Revisi Online Kerja Praktek
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <FailedAuthModal
                show={showModal}
                onHide={() => setShowModal(false)}
                message={errorMessage}
            />


            {/* <Row>
                <Col className="bg-light p-2" >
                    <p className="text-start fs-3 fw-2 fw-semibold mx-5" > Dashboard Sistem Report Kerja Praktek </p>
                </Col>
            </Row> */}
                        {/* <Navbar>
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-3 fw-semibold">
                        Users
                    </Navbar.Brand>
                </Container>
            </Navbar> */}
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        New report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <Form id="sendNewreport" >
                        {
                            users.type == "koordinator" ?
                                <Form.Group className="mb-3" >
                                    <Form.Label>To</Form.Label>
                                    <Form.Select id="reciever" aria-label="Default select example">
                                        <option>Send to users</option>
                                        {
                                            usersall.map(
                                                (user, index) => {
                                                    if (user.username !== users.username) {
                                                        return <option value={user.username} key={index}>{user.fullname}</option>
                                                    }
                                                }
                                            )
                                        }
                                        {/* <option value="Kerja praktek">Kerja Praktek</option>
                                        <option value="Proyek mini">Proyek mini</option> */}
                                    </Form.Select>
                                </Form.Group>
                                :
                                null

                        }
                        <Form.Group className="mb-3">
                            <Form.Label>New Report File</Form.Label>
                            <Form.Control
                                id="fileReport"
                                type="file"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"

                        >
                            <Form.Label>Komentar</Form.Label>
                            <Form.Control as="textarea" rows={13} id="commentReport" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={
                        () => {
                            sendReport()
                        }
                    } >
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col
                    style={{ height: window.innerHeight - 100 }}
                >
                    <Stack direction="horizontal" gap={3}>
                        <div
                            style={{
                                borderRight: '1px solid grey',
                                display: "inline-block",
                                // Width: '1000px',
                                // minHeight: ,
                                height: window.innerHeight - 80,
                            }}
                        >
                            <Button
                                size="sm"
                                className="me-2"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                variant="outline-secondary"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Button>
                            <div style={{ Height: '100%' }} className="me-3 mt-5 " >
                                <Collapse in={open} dimension="width">
                                    <div id="example-collapse-text">
                                        {/* <Card body style={{
                                            width: '200px',
                                            height: "100%"
                                        }}>
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                                            accusamus terry richardson ad squid. Nihil anim keffiyeh
                                            helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                            ea proident.
                                        </Card> */}
                                        <ListGroup variant="flush" >
                                            {
                                                nav !== "" ?
                                                    nav.map(
                                                        (item, index) =>
                                                            <a href={item.to} className="text-decoration-none" key={index} >
                                                                <ListGroup.Item style={{ display: "block", width: "100%" }} >{item.name}</ListGroup.Item>
                                                            </a>

                                                    ) : null

                                            }
                                        </ListGroup>
                                        {/* <ListGroup variant="flush" className="mx-5 " > */}
                                        {/* <ListGroup.Item style={{ display: "block", width: "100%" }}  href="/">Home</ListGroup.Item>
                                            <ListGroup.Item style={{ display: "block", width: "100%" }} href="/logout">Logout</ListGroup.Item>
                                        </ListGroup> */}
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div
                            className="mt-5"
                            style={{
                                display: "inline-block",
                                width: window.innerWidth - 200,
                                // minHeight: ,
                                height: window.innerHeight - 80,
                            }}
                        >
                            {/* <p className="text-center mx-5 ">Pengguna user</p>

                            <ListGroup variant="flush" className="mt-5" >
                                <ListGroup.Item>Revisi 4</ListGroup.Item>
                                <ListGroup.Item>Revisi 4</ListGroup.Item>
                                <ListGroup.Item>Revisi 4</ListGroup.Item>
                                <ListGroup.Item>Revisi 4</ListGroup.Item>
                            </ListGroup> */}
                            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                <Row>
                                    <Col
                                        sm={4}

                                        style={{
                                            borderRight: '1px solid grey',
                                            display: "inline-block",
                                            Width: '300px',
                                            // minHeight: ,
                                            height: window.innerHeight - 80,
                                        }}
                                    >
                                        <Stack direction="horizontal" gap={5} >
                                            <p>{JSON.parse(identity).fullname}</p>
                                            <p className="ms-auto" >Usertype: {JSON.parse(identity).type}</p>
                                        </Stack>
                                        <hr />
                                        <Stack direction="horizontal" gap={3} >
                                            <p>Timeline Report</p>
                                            <Button variant="secondary" onClick={() => setShow(true)} className="ms-auto" >Send New Report</Button>
                                        </Stack>
                                        <ListGroup>
                                            {

                                                conversations == 400 ?
                                                    <p>No item Found</p>
                                                    :
                                                    conversations.map(
                                                        (item, index) => {
                                                            // console.log(index)
                                                            return <ListGroup.Item className="mt-2" action href={`#link${index}`} key={index} >
                                                                <Stack direction="horizontal" gap={5} className="my-auto" >
                                                                    <p>{item.sender}</p>
                                                                    <p className="ms-auto">{item.date}</p>
                                                                </Stack>
                                                            </ListGroup.Item>
                                                        }
                                                    )

                                            }

                                        </ListGroup>
                                    </Col>
                                    <Col sm={8}>
                                        <Tab.Content>
                                            {

                                                conversations == 400 ?
                                                    null
                                                    :
                                                    conversations.map(
                                                        (item, index) => {
                                                            console.log(item)
                                                            return <Tab.Pane eventKey={`#link${index}`} key={index}>
                                                                <BodyTimeline to={item.sender} comment={item.message} uri={item.uri} tanggal={item.date} penerima={item.reciever} pengirim={item.sender} />
                                                            </Tab.Pane>
                                                        }
                                                    )

                                            }
                                            {/* <Tab.Pane eventKey="#link1">
                                                <BodyTimeline comment="link report terbaru" />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="#link2" >
                                                <BodyTimeline comment="link report sebelumnya" />
                                            </Tab.Pane> */}
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>

                    </Stack>
                </Col>
            </Row>

        </Container>
    )

}