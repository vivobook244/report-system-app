import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Stack, ListGroup, Collapse, Modal, Form, ModalDialog, Alert, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import navigation_administrator from "../../routers/navigation_administrator";
// import styles from '../../assets/style/styles.module.css';
// import Sidabar from "../../assets/component/sidebar";
// import { checkSession } from "../../routes/checkAuth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { retrieveData } from '../../localStorage'
import FailedAuthModal from "../../assets/component/failedAuthModal";


export default function Dosen(props) {

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const [show3, setShow3] = useState(false);


    const [show2, setShow2] = useState(false);

    const [nav, setNav] = useState("")

    // perencanaan panduan membuat user
    const [show4, setShow4] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const identity = retrieveData("DATAUSER")
    const [chooseid, setChooseid] = useState("")
    const [chooseid2, setChooseid2] = useState("")


    const [isLoading, setLoading] = useState(false);
    const [dosen, setDosen] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fullname, setFullname] = useState("");
    const [konsentrasi, setKonsentrasi] = useState("");
    const [quota,setQuota] = useState("");

    let redirect = useNavigate()


    const handleFullname = (event) => {
        event.persist();
        let value = event.target.value
        setFullname(value);
    }

    const handleKonsentrasi = (event) => {
        event.persist();
        let value = event.target.value
        setKonsentrasi(value);
    }

    const handleQuota = (event) => {
        event.persist();
        let value = event.target.value
        setQuota(value);
    }


    const handleButtonSave = () => {
        setLoading(true)

        const userToken = retrieveData("TOKEN")

        // return console.log( username,password,fullname,angkatan,policy,cat,status ) 

        api.post("/create-data-dosen-web",
            {
                fullname: fullname,
                konsentrasi: konsentrasi,
                kuota: quota,
                sisa_kuota:quota,
                is_active: true,
                is_remove: false
            },
            {
                headers: {
                    'x-auth-token': userToken
                },
            }
        ).then(res => {
            console.log(res.data)
            if (res.data.Code === 401) {
                setShowModal(true)
                setErrorMessage(res.data.message)
                setLoading(false)
                
            } else if (res.data.Code === 201) {
                setLoading(false)
                setShowModal(true)
                setErrorMessage(res.data.message)
                handleClose()
                
            }else if (res.data.Code === 409) {
                setLoading(false)
                setShowModal(true)
                setErrorMessage(res.data.message)
                handleClose()
                
            }
        }).catch(error => {
            setLoading(false)
            console.log(error)
            console.log("error sign in")
            setShowModal(true)
            setErrorMessage(error.code)
            

        })


    };


    const deleteDosen = (idUser) => {
        const userToken = retrieveData("TOKEN")
        api.post("/delete-data-dosen-web",
            {
                id: idUser,

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
                    setShowModal(true)
                    setErrorMessage(res.data.message)
                    setLoading(false)
                    handleClose2()

                } else if (res.data.Code === 201) {
                    setLoading(false)
                    setShowModal(true)
                    setErrorMessage(res.data.message)
                    handleClose2()

                }
            }

        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }


    const getDosen = () => {

        const userToken = retrieveData("TOKEN")
        api.get("/get-data-dosen-web",
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
                    setDosen(res.data.message)
                }
            }

        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }

    const updateDosen = () => {
        setLoading(true)

        const userToken = retrieveData("TOKEN")

        // return console.log(username, password, fullname, angkatan,konsentrasi ,policy, cat, status)
        var used_quota = dosen[0].kuota - dosen[0].sisa_kuota;
        var edit = false

        

        if( dosen[0].kuota > quota ){
            var diferent_quota = dosen[0].kuota - quota;
            var new_sisa_kuota = dosen[0].sisa_kuota - diferent_quota
            if(new_sisa_kuota => 0 ){
                edit = true;
            } else if(new_sisa_kuota < 0 ){
                edit = false;
            }
        }else if ( (dosen[0].kuota < quota) || (dosen[0].kuota === quota) ) {
            edit = true;
        } 

        
        if ( edit === true ) {
            api.post("/update-data-dosen-web",
                {
                    id: chooseid2.id,
                    fullname: fullname,
                    konsentrasi: konsentrasi,
                    kuota: quota,
                },
                {
                    headers: {
                        'x-auth-token': userToken
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.Code === 401) {
                        setShowModal(true)
                        setErrorMessage(res.data.message)
                        setLoading(false)
                        handleClose3()
                        
                    } else if (res.data.Code === 201) {
                        setLoading(false)
                        setShowModal(true)
                        setErrorMessage(res.data.message)
                        handleClose3()
                        
    
                    }
                }).catch(error => {
                    setLoading(false)
                    console.log(error)
                    console.log("error sign in")
                    setShowModal(true)
                    setErrorMessage(error.code)
                    
    
                })
        } else {
            setShowModal(true)
            setErrorMessage("Edit quota tidak dapat dilakukan, perhatikan angka yang anda masukan")
        }

    }


    useEffect(
        () => {
            getDosen()
            if (identity == null) {
                redirect("../", { replace: true });
            }
            console.log(identity)
            let ident = JSON.parse(identity)
            console.log(ident.type)
            if (ident.type == "koordinator" || ident.type == "administrator" ) {
                setNav(navigation_administrator)
                console.log(nav)
            }

            if (ident.type == "mahasiswa") {
                redirect("../not_found", { replace: true });
            }


        }, []

    )

    useEffect(
        () => {


            if (chooseid2 !== "") {

                setFullname(chooseid2.fullname_dosen)
                setKonsentrasi(chooseid2.konsentrasi)
                setQuota(chooseid2.kuota)
                handleShow3()

            }
        }, [chooseid2]
    )

    useEffect(
        () => {
            if (chooseid !== "") {
                handleShow2()

            }
        }, [chooseid]
    )

    return (
        <Container fluid >
            <FailedAuthModal
                show={showModal}
                onHide={() =>{ 
                    setShowModal(false) 
                    document.location.reload() 
                }}
                message={errorMessage}
            />
            {/* adding modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Menambahkan Dosen Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create_user">
                        <Form.Group className="mb-3" >
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleFullname} value={fullname} type="text" placeholder="Fullname" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="selectPolicyusers2">
                            <Form.Label>Pilih Konsentrasi</Form.Label>
                            <Form.Select onChange={handleKonsentrasi} value={konsentrasi} aria-label="Default select example">
                                <option>Konsentrasi</option>
                                <option value="Energi">Energi</option>
                                <option value="Elektronika instrumentasi">Elektronika instrumentasi</option>
                                <option value="Telekomunikasi">Telekomunikasi</option>
                                <option value="Komputer">Komputer</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="selectPolicyusers2">
                            <Form.Label>Pilih Quota</Form.Label>
                            <Form.Select onChange={handleQuota} value={quota} aria-label="Default select example">
                                <option>Quota</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                              
                            </Form.Select>
                        </Form.Group>
                        <Form.Label> ⚠️ | Catatan Penting : Pastikan Semua Data Terisi !</Form.Label>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={
                            () => {
                                handleButtonSave()
                            }
                        }

                    >Save</Button>
                </Modal.Footer>
            </Modal>

            {/* edit modal */}
            <Modal
                show={show3}
                onHide={() => {
                    handleClose3()
                    setChooseid2("")
                    setFullname("")
                    setKonsentrasi("")
                }}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Dosen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="update_user">
                        <Form.Group className="mb-3" >
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleFullname} value={fullname} type="text" placeholder="Fullname" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="selectPolicyusers2">
                            <Form.Label>Konsentrasi</Form.Label>
                            <Form.Select onChange={handleKonsentrasi} defaultValue={konsentrasi} aria-label="Default select example">
                                <option value="N/A" >Konsentrasi</option>
                                <option value="Energi">Energi</option>
                                <option value="Elektronika instrumentasi">Elektronika instrumentasi</option>
                                <option value="Telekomunikasi">Telekomunikasi</option>
                                <option value="Komputer">Komputer</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="selectPolicyusers2">
                            <Form.Label>Pilih Quota</Form.Label>
                            <Form.Select onChange={handleQuota} value={quota} aria-label="Default select example">
                                <option>Quota</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                              
                            </Form.Select>
                        </Form.Group>
                        <Form.Label> ⬆️ | Setelah Data di ubah, Periksa data terlebih dahulu.</Form.Label>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose3()
                        setChooseid2("")
                    }}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={
                            () => {
                                updateDosen()
                            }
                        }
                    >Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Panduan dalam mengisi table */}
            <ModalDialog>
                <Modal
                    show={show4}
                    onHide={handleClose4}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header >
                        <Modal.Title>Panduan Tabel 💡</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form id="panduan_user"></Form>
                        <Alert variant="success">
                            <Alert.Heading>
                            🏆 Aturan Tabel 
                            </Alert.Heading>
                            <hr></hr>
                            <ol>
                                <li></li>
                            </ol>
                            </Alert>
                        <Alert variant="danger">
                            <Alert.Heading className="mb-0">
                                🔥 Awas!!
                            </Alert.Heading>
                            <hr></hr>
                            <p className="mt-0">
                            <ol>
                                <li>Mengubah/Edit "username" pada tabel berdampak pada pesan </li>
                            </ol>
                            </p>
                        </Alert>
                    </Modal.Body>
                    <br></br>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose4}>
                            Saya Mengerti
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ModalDialog>
            <Navbar>
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-2 fw-semibold">
                        Dosen
                    </Navbar.Brand>
                </Container>
            </Navbar>

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
                                                nav !== "" ?
                                                    nav.map(
                                                        (item, index) =>
                                                            <a href={item.to} className="text-decoration-none" key={index} >
                                                                <ListGroup.Item style={{ display: "block", width: "100%" }} >{item.name}</ListGroup.Item>
                                                            </a>

                                                    ) : null

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
                                
                            }
                            
                            
                            
                
                        }

                        >
                            <Button  className="btn btn-primary" onClick={handleShow} >
                                Tambah Dosen
                            </Button>
                            
                            <Button className="btn btn-warning mx-4" onClick={handleShow4}>
                                Panduan Tabel 
                                </Button>
                            <Table striped bordered hover className="mt-4" >
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama </th>
                                        <th>Konsentrasi</th>
                                        <th>Quota</th>
                                        <th>Sisa Quota</th>
                                        <th>Opsi</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dosen.map(
                                            (item, index) => {
                                                return <tr key={index} >
                                                    <td>{item.id_dosen}</td>
                                                    <td>{item.fullname_dosen}</td>
                                                    <td>{item.konsentrasi}</td>
                                                    <td>{item.kuota}</td>
                                                    <td>{item.sisa_kuota}</td>
                                                    <td>
                                                        <Stack direction="horizontal" gap={3}  >
                                                            <Button variant="primary" onClick={
                                                                () => {
                                                                    setChooseid2(item)

                                                                }
                                                            } >
                                                                <span className="fs-6" >Edit</span>
                                                            </Button>
                                                            <Button variant="danger" onClick={() => {
                                                                setChooseid(item)
                                                            }} >
                                                                 <span className="fs-6" >Hapus</span>
                                                            </Button>
                                                        </Stack>
                                                    </td>
                                                </tr>
                                            }
                                        )
                                    }
                                    {/* modal delete confirm */}
                                    <Modal show={show2} onHide={
                                        () => { 
                                            handleClose2() 
                                        }
                                    } backdrop="static" >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Notification ☎️</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Apakah Anda yakin ingin menghapus {chooseid.fullname}?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="success" onClick={
                                                () => {
                                                    handleClose2()
                                                    setChooseid("")
                                                }
                                                }
                                                >
                                                Cancel 📘
                                            </Button>
                                            <Button variant="danger" onClick={() => { deleteDosen(chooseid.id_dosen) }}>
                                                Delete 🗑️
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </tbody>
                            </Table>
                        </div>
                    </Stack>
                </Col>
            </Row >

        </Container >
    )

}
