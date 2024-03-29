import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../assets/style/styles.module.css'
import FailedAuthModal from "../../assets/component/failedAuthModal";
import api from "../../services/api";

export default function RegisterStudents(props) {

    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [angkatan, setAngkatan] = useState("");
    const [konsentrasi, setKonsentrasi] = useState("");
    const [cat, setCat] = useState("");
    const [judul, setJudul] = useState("");
    const [dosbing, setDosbing] = useState("N/A");
    const [listDosen, setListdosen] = useState([]);

    const handleClose = () => {
        setShowModal(false)
        handleReset()
    };
    const handleShow = () => setShowModal(true);

    const handleButtonSave = () => {
        setLoading(true)

        api.post("/register-web",
            {
                fullname: fullname,
                username: username,
                password: password,
                angkatan: angkatan,
                konsentrasi: konsentrasi,
                policy: "mahasiswa",
                cat: cat,
                judul_penelitian: judul,
                dosen_pembimbing: dosbing,
                status: "N/A",
                is_active: false,
                is_remove: false
            },
        ).then(res => {
            if (res.data.Code === 201) {
                setLoading(false)
                handleShow()
                setErrorMessage(res.data.message)

            } else if (res.data.Code === 409) {
                setLoading(false)
                handleShow()
                setErrorMessage(res.data.message)

            } else if (res.data.Code === 401) {
                setLoading(false)
                handleShow()
                setErrorMessage(res.data.message)

            }
        }).catch(error => {
            setLoading(false)
            handleShow()
            setErrorMessage(error.code)


        })
    };

    const retrive_dosen = () => {
        api.get(`/dosen-web-for-register/${konsentrasi}`,
            {},
        ).then(res => {
            if (res.data.Code === 201) {
                setListdosen(res.data.message)
            }
            if (res.data.Code === 400) {
                setListdosen([])
            }
        }).catch(error => {
           console.log(error)
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

    const handleJudul = (event) => {
        event.persist();
        let value = event.target.value
        setJudul(value);
    }

    const handleDosbing = (event) => {
        event.persist();
        let value = event.target.value
        setDosbing(value);
    }

    const handleReset = () => {
        setUsername("");
        setPassword("");
        setFullname("");
        setAngkatan("");
        setKonsentrasi("");
        setCat("");
        setJudul("");
    }

    useEffect(
        ()=>{
            if (cat === "Proyek mini") {
                retrive_dosen()
            }else if(cat !== "Proyek mini"){
                setDosbing("N/A")
            }    
        
        },[cat, konsentrasi]
    )



    return (
        <Container fluid >
            <FailedAuthModal

                show={showModal}
                onHide={handleClose}
                message={errorMessage}

            />
            <Row className="justify-content-center align-items-center">
                <Col xl={3} lg={4} md={6} sm={10} >
                    <div className={styles.BoxRegister} >
                        <p href="#" className={styles.tulisanLogin}>Registration</p>
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
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="selectPolicyusers3">
                                <Form.Label>Pilih Katogori</Form.Label>
                                <Form.Select onChange={handleCat} value={cat} aria-label="Default select example">
                                    <option>Kategori</option>
                                    <option value="Kerja praktek">Kerja Praktek</option>
                                    <option value="Proyek mini">Proyek mini</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Judul Kerja Praktek/Proyek Mini</Form.Label>
                                <Form.Control value={judul} onChange={handleJudul} as="textarea" rows={2} />
                            </Form.Group>

                            {
                                cat === "Proyek mini" ?
                                    <Form.Group className="mb-3" controlId="selectPolicyusers3">
                                        <Form.Label>Pilih Dosen Pembimbing</Form.Label>
                                        <Form.Select onChange={handleDosbing} value={dosbing} aria-label="Default select example">
                                            <option>Dosen Pembimbing</option>
                                            {
                                                listDosen.length !== 0 ? 
                                                    listDosen.map(
                                                        (item, index)=> <option key={index} value={item.id_dosen} >{item.fullname_dosen}</option>
                                                    )
                                                :

                                                <></>
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    :
                                    <></>
                            }

                            <Button
                                href="#" className={styles.tombolLogin}
                                disabled={isLoading}
                                onClick={!isLoading ? handleButtonSave : null}
                            >
                                {'Simpan'}
                            </Button>
                            <Button
                                href="/" className={styles.tombolLogin}
                            >
                                {'Kembali ke Login'}
                            </Button>
                            <Form.Label className="mt-2" > ⚠️ | Catatan Penting : Pastikan Semua Data Terisi !</Form.Label>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )


}