import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button, Stack, ListGroup, Tab, Collapse, Modal, Form, ModalBody, ModalDialog, Alert, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import navigation_administrator from "../../routers/navigation_administrator";

import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { retrieveData } from '../../localStorage'
import FailedAuthModal from "../../assets/component/failedAuthModal";


export default function Mahasiswa(props) {

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
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [angkatan, setAngkatan] = useState("");
    const [konsentrasi, setKonsentrasi] = useState("");
    const [cat, setCat] = useState("");
    const [status, setStatus] = useState("");


    let redirect = useNavigate()

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


    const handleFullname = (event) => {
        event.persist();
        let value = event.target.value
        setFullname(value);
    }

    const handleAngkatan = (event) => {
        event.persist();
        let value = event.target.value
        setAngkatan(value);
    }

    const handleCat = (event) => {
        event.persist();
        let value = event.target.value
        setCat(value);
    }

    const handleKonsentrasi = (event) => {
        event.persist();
        let value = event.target.value
        setKonsentrasi(value);
    }

    const handleStatus = (event) => {
        event.persist();
        let value = event.target.value
        setStatus(value);
    }


    const handleButtonSave = () => {
        setLoading(true)

        const userToken = retrieveData("TOKEN")

        // return console.log( username,password,fullname,angkatan,policy,cat,status ) 

        api.post("/create-data-users-web",
            {
                fullname: fullname,
                username: username,
                password: password,
                angkatan: angkatan,
                konsentrasi: konsentrasi,
                policy: "mahasiswa",
                cat: cat,
                status: status,
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


    const deleteUser = (idUser) => {
        const userToken = retrieveData("TOKEN")
        api.post("/delete-data-users-web",
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
                    setUsers(res.data.message)
                }
            }

        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }

    const updateUsers = () => {
        setLoading(true)

        const userToken = retrieveData("TOKEN")

        // return console.log(username, password, fullname, angkatan,konsentrasi ,policy, cat, status)

        api.post("/changed-data-user-web",
            {
                id: chooseid2.id,
                fullname: fullname,
                username: username,
                password: password,
                angkatan: angkatan,
                konsentrasi: konsentrasi,
                cat: cat,
                status: status
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
    }


    useEffect(
        () => {
            getUser()
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

                setFullname(chooseid2.fullname)
                setUsername(chooseid2.username)
                setPassword(chooseid2.password)
                setAngkatan(chooseid2.angkatan)
                setKonsentrasi(chooseid2.konsentrasi)
                setCat(chooseid2.cat)
                setStatus(chooseid2.status)
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
                    <Modal.Title>Menambahkan Mahasiswa Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create_user">
                        <Form.Group className="mb-3" >
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleFullname} value={fullname} type="text" placeholder="Fullname" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Username </Form.Label>
                                <Form.Control onChange={handleUsername} value={username} type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handlePassword} value={password} type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Pilih Tahun Angkatan</Form.Label>
                            {/* <Form.Control onChange={handleAngkatan} value={angkatan} type="text" placeholder="Angkatan" /> */}
                            <Form.Select onChange={handleAngkatan} value={angkatan} aria-label="Default select example">
                                <option>Angkatan</option>
                                <option value="-" >Tidak Perlu (khusus koordinator)</option>
                                <option value="2015" >2015</option>
                                <option value="2016" >2016</option>
                                <option value="2017" >2017</option>
                                <option value="2018" >2018</option>
                                <option value="2019" >2019</option>
                                <option value="2020" >2020</option>
                                <option value="2021" >2021</option>
                                <option value="2022" >2022</option>
                                <option value="2023" >2023</option>
                                <option value="2024" >2024</option>
                                <option value="2025" >2025</option>
                                <option value="2026" >2026</option>
                            </Form.Select>
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

                        <Form.Group className="mb-3" controlId="selectPolicyusers3">
                            <Form.Label>Pilih Katogori</Form.Label>
                            <Form.Select onChange={handleCat} value={cat} aria-label="Default select example">
                                <option>Kategori</option>
                                <option value="Kerja praktek">Kerja Praktek</option>
                                <option value="Proyek mini">Proyek mini</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="selectPolicyusers4">
                            <Form.Label>Pilih Status Laporan</Form.Label>
                            <Form.Select onChange={handleStatus} value={status} aria-label="Default select example">
                                <option>Status Laporan</option>
                                <option value="Proses Revisi">Masih Dalam Proses Revisi</option>
                                <option value="Lulus Bersyarat">Laporan Selesai Bersyarat</option>
                                <option value="Selesai">Laporan Selesai</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
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
                    setUsername("")
                    setPassword("")
                    setAngkatan("")
                    setKonsentrasi("")
                    setCat("")
                    setStatus("")
                }}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editing User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="update_user">
                        <Form.Group className="mb-3" >
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleFullname} value={fullname} type="text" placeholder="Fullname" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={handleUsername} value={username} type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handlePassword} value={password} type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Angkatan</Form.Label>
                            {/* <Form.Control onChange={handleAngkatan} value={angkatan} type="text" placeholder="Angkatan" /> */}
                            <Form.Select onChange={handleAngkatan} value={angkatan} aria-label="Default select example">
                                <option value="N/A" >Pilih Tahun Angkatan</option>
                                <option value="-" >Tidak Perlu (khusus koordinator)</option>
                                <option value="2015" >2015</option>
                                <option value="2016" >2016</option>
                                <option value="2017" >2017</option>
                                <option value="2018" >2018</option>
                                <option value="2019" >2019</option>
                                <option value="2020" >2020</option>
                                <option value="2021" >2021</option>
                                <option value="2022" >2022</option>
                                <option value="2023" >2023</option>
                                <option value="2024" >2024</option>
                                <option value="2025" >2025</option>
                                <option value="2026" >2026</option>
                            </Form.Select>
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

                        <Form.Group className="mb-3" controlId="selectPolicyusers3">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select onChange={handleCat} defaultValue={cat} aria-label="Default select example">
                                <option value="N/A" >Kerja praktek/Proyek mini</option>
                                <option value="Kerja praktek">Kerja Praktek</option>
                                <option value="Proyek mini">Proyek mini</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="selectPolicyusers4">
                            <Form.Label>Pilih Status Laporan</Form.Label>
                            <Form.Select onChange={handleStatus} defaultValue={status} aria-label="Default select example">
                                <option value="N/A" >Status Laporan</option>
                                <option value="Proses Revisi">Masih Dalam Proses Revisi</option>
                                <option value="Lulus Bersyarat">Laporan Selesai Bersyarat</option>
                                <option value="Selesai">Laporan Selesai</option>
                                <option value="-">Tidak Perlu (khusus koordinator)</option>
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
                                updateUsers()
                            }
                        }
                    >Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Panduan dalam mengisi table */}
            <ModalDialog>
            
            {/* adding modal */}
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



            {/* <Row>
                <Col className="bg-light pt-3 mb-1" >
                    <p className="text-start fs-3 fw-2" > users </p>
                </Col>
            </Row> */}
            
            <Navbar>
                <Container className="mx-4 my-10">
                    <Navbar.Brand className="fs-2 fw-semibold">
                        Mahasiswa
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
                                Tambah Mahasiswa 
                            </Button>
                            
                            <Button className="btn btn-warning mx-4" onClick={handleShow4}>
                                Panduan Tabel 
                                </Button>
                            <Table striped bordered hover className="mt-4" >
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama </th>
                                        <th>Username</th>
                                        <th>Angkatan</th>
                                        <th>Konsentrasi</th>
                                        <th>Kategori</th>
                                        <th>Judul Penelitian</th>
                                        <th>Status pengguna</th>
                                        <th>Status Laporan</th>
                                        <th>Opsi</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // console.log(
                                        //     Array.isArray(users)
                                        // )

                                        users.map(
                                            (user, index) => {
                                                return <tr key={index} >
                                                    <td>{user.id}</td>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.angkatan}</td>
                                                    <td>{user.konsentrasi}</td>
                                                    <td>{user.cat}</td>
                                                    <td>{user.judul_penelitian}</td>
                                                    <td>{user.is_active ? "aktif" : "non-aktif"}</td>
                                                    <td>{user.status}</td>
                                                    <td>
                                                        <Stack direction="horizontal" gap={3}  >
                                                            <Button variant="primary" onClick={
                                                                () => {
                                                                    setChooseid2(user)

                                                                }
                                                            } >
                                                                <span className="fs-6" >Edit</span>
                                                            </Button>
                                                            <Button variant="danger" onClick={() => {
                                                                setChooseid(user)
                                                            }} >
                                                                 <span className="fs-6" >Hapus</span>
                                                            </Button>
                                                            <Button variant={user.is_active ? "secondary" : "success"} onClick={() => {
                                                                
                                                            }} >
                                                                 <span className="fs-6" >{user.is_active ? "non-aktifkan" : "aktifkan"}</span>
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
                                            <Button variant="danger" onClick={() => { deleteUser(chooseid.id) }}>
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
