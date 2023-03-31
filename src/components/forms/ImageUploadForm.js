import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ImageUploadForm = () => {

    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
        }
        axios.post("http://localhost:8080/api/images", formData)
            .then(response => {
                console.log(response.data);
                setSelectedFiles(null); // clear the form
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="file" onChange={handleFileInputChange} multiple />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Upload
                    </Button>
                </Form>
            </div>

        </>
    )
}

export default ImageUploadForm;

