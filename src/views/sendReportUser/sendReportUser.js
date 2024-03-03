import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button, Stack, ListGroup, Tab, Collapse, Modal, Form, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BodyTimeline from "../../assets/component/bodyTimeline";
import navigation_user from "../../routers/navigations_user";
import navigation_administrator from "../../routers/navigation_administrator";
import { retrieveData } from '../../localStorage'
// import navigations from "../../routers/navigations_user";
// import styles from '../../assets/style/styles.module.css';
// import Sidabar from "../../assets/component/sidebar";
// import { checkSession } from "../../routes/checkAuth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
// import { retrieveData } from '../../localStorage'


export default function SendReportUser(props) {

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [nav, setNav] = useState("")
    const [conversations, setConversations] = useState([])

    const identity = retrieveData("DATAUSER")
    let redirect = useNavigate()

    const getConversations = () => {
        let ident = JSON.parse(identity)
        const userToken = retrieveData("TOKEN")
        api.post("/get-data-send-conversations-web",
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

    useEffect(() => {
        getConversations()
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
            <Navbar>
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-2 fw-semibold">
                        Sent Report
                    </Navbar.Brand>
                </Container>
            </Navbar>
            {/* <Row>
                <Col className="bg-light pt-3 mb-1" >
                    <p className="text-start fs-3 fw-2" > Dashboard Sistem Report Kerja Praktek </p>
                </Col>
            </Row> */}
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
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>New Report File</Form.Label>
                            <Form.Control
                                type="file"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Komentar</Form.Label>
                            <Form.Control as="textarea" rows={13} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary">
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
                                                                    <p>to: {item.reciever}</p>
                                                                    <p className="ms-auto">{item.date}</p>
                                                                </Stack>
                                                            </ListGroup.Item>
                                                        }
                                                    )

                                            }

                                            {/* <ListGroup.Item action href="#link1">
                                                Revisi #
                                            </ListGroup.Item>
                                            <ListGroup.Item action href="#link2">
                                                Revisi #
                                            </ListGroup.Item>
                                            <ListGroup.Item action href="#link3">
                                                Revisi #
                                            </ListGroup.Item>
                                            <ListGroup.Item action href="#link4">
                                                Revisi #
                                            </ListGroup.Item> */}
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
                                                                <BodyTimeline to={item.reciever} comment={item.message} uri={item.uri} tanggal={item.date} penerima={item.reciever} pengirim={item.sender} />
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