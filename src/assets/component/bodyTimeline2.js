import React, { useState } from "react";
import {  Button,  Modal, Form } from "react-bootstrap";
import api from "../../services/api";
import { retrieveData } from '../../localStorage'
import FailedAuthModal from "./failedAuthModal";
import styles from '../style/styles.module.css'
import fileDownload from "js-file-download";




export default function BodyTimeline(props) {

    const [show, setShow] = useState(false);
    const [content, setContent] = useState(props.comment)
    const [validated, setValidated] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const identity = retrieveData("DATAUSER")

    const sendReport = (to_end) => {
        const userToken = retrieveData("TOKEN")
        let ident = JSON.parse(identity)
        const comment = document.getElementById("commentReport");
        const filesReport = document.getElementById("fileReport");
        const reciever = document.getElementById("reciever");

        // return console.log(ident)

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

        formData.append("reciever", to_end)
        formData.append("message", comment.value)
        formData.append("date", dateTostring)
        formData.append("files", filesReport.files[0]);


        // return console.log(formData.keys)

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
                setShowModal2(true)
                setErrorMessage(res.data.message)
                document.getElementById("sendNewreport").reset()
            } else if (res.data.Code === 201) {
                setShow(false)
                setShowModal2(true)
                setErrorMessage(res.data.message)
                document.getElementById("sendNewreport").reset()

            }
        }).catch(err => {
            console.log(err)
            // return ToastAndroid.show("error",ToastAndroid.LONG,ToastAndroid.CENTER);
            // console.log(err.message)
            setShow(false)
            setShowModal2(true)
            setErrorMessage(err.code)
            document.getElementById("sendNewreport").reset()
        })
    }

    const downloadFile = (uri) => {

        const userToken = retrieveData("TOKEN")

        api.post("/download-file-web",
            {
                uri: uri
            },
            {
                headers: {
                    'x-auth-token': userToken,
                    
                },
                responseType: 'blob',
            }
        ).then((res) => {
            console.log(res.data)
            // if (res.data.Code === 401) {
            //     setShow(false)
            //     setShowModal2(true)
            //     setErrorMessage(res.data.message)
            var extract = uri.split(".")
            console.log(extract)
            const date = new Date()

            const hour = date.getHours()
            const minutes = date.getMinutes()
            const times = `${hour}_${minutes}`
            const day = date.getDay()
            const dates = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            let nameFile = `${dates}${month}${year}${times}.${extract[1]}`
            fileDownload(res.data, nameFile)
            // } else if (res.data.Code === 201) {
            //     setShow(false)
            //     setShowModal2(true)
            //     setErrorMessage(res.data.message)

            // }
        }).catch(err => {
            console.log(err)
            // return ToastAndroid.show("error",ToastAndroid.LONG,ToastAndroid.CENTER);
            // console.log(err.message)
            setShow(false)
            setShowModal2(true)
            setErrorMessage(err.code)
            // document.getElementById("sendNewreport").reset()
        })
    }



    return (
        <>
            <Button variant="secondary" onClick={() => setShow(true)} >Reply</Button>
            <hr></hr>
            {
                props.uri != "unknown" ?
                <Button onClick={
                    () => { downloadFile(props.uri) }
                } className="mt-2" variant="outline-info"> File </Button> : null
            }
            {/* <p className="mt-2" >
            </p>
        */}
            <textarea disabled className={styles.showComment} >
                {props.comment}
            </textarea>
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
                        Update Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <Form id="sendNewreport"  >
                        <Form.Group className="mb-3" >
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
                            <Form.Control as="textarea" rows={13}
                                id="commentReport"
                                defaultValue={`
_________________________________________________________________ 
Pengirim : ${props.pengirim}
Penerima : ${props.penerima}
Date : ${props.tanggal}
                                
                                
${props.comment}
                            `}
                            />
                        </Form.Group>
                        <Button className="my-2" variant="danger" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button className="my-2" id="submit" variant="primary" onClick={
                            () => {
                                sendReport(props.to)
                            }
                        } >
                            Send
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <FailedAuthModal
                show={showModal2}
                onHide={() => setShowModal2(false)}
                message={errorMessage}
            />
        </>
    )

}