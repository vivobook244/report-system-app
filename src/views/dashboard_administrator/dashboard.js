import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button, Stack, ListGroup, Tab, Collapse, Modal, Form, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BodyTimeline from "../../assets/component/bodyTimeline";
// import Styles from "../../assets/style/module2"
// import navigations from "../../routers/navigation_administrator";
import navigation_administrator from "../../routers/navigation_administrator";
//import styles from '../../assets/style/styles.module2.css';
// import Sidabar from "../../assets/component/sidebar";
// import { checkSession } from "../../routes/checkAuth";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { retrieveData } from '../../localStorage'


export default function DashboardAdministrator(props) {

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const nav_admin = navigation_administrator

    // useEffect(
    //     ()=>{ console.log(nav_admin) }
    // )
    return (
        <Container fluid >
                <Navbar>
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-2 fw-semibold">
                    Sistem Revisi Online Kerja Praktek
                    </Navbar.Brand>
                </Container>
            </Navbar>
            {/* <Row>
                <Col className="bg-light position-fixed" >
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
                                        <ListGroup variant="flush" >

                                            {
                                                nav_admin.map(
                                                    (item, index) => 
                                                        <a href={item.to} className="text-decoration-none" key={index} >
                                                            <ListGroup.Item style={{ display: "block", width: "100%" }} >{item.name}</ListGroup.Item>
                                                        </a>
                                                    
                                                )

                                            }
                                        </ListGroup>
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
                                        <p>Timeline Report</p>
                                        <ListGroup>
                                            <ListGroup.Item action href="#link1">
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
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col sm={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="#link1">
                                                <BodyTimeline comment="link report terbaru" />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="#link2" >
                                                <BodyTimeline comment="link report sebelumnya" />
                                            </Tab.Pane>
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