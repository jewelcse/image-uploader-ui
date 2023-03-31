import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const Images = () => {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/images')
            .then((response) => {
                setImages(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getImageUrl = (originalFileName) => {
        return `http://localhost:8080/api/images/${originalFileName}`;
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedImageIndex(null);
        setShowModal(false);
    };

    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    return (
        <>
            <CardGroup className="mt-4">
                <Row xs={1} md={2} lg={4}>
                    {images.map((image, index) => (
                        <Col key={image.id} className="mb-4">
                            <Card
                                style={{ width: '18rem', cursor: 'pointer' }}
                                onClick={() => handleImageClick(index)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={getImageUrl(image.thumbnailFileName)}
                                    style={{
                                        maxWidth: '400px',
                                        maxHeight: '400px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </CardGroup>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <FaTimes />
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', position: 'relative' }}>
                    <button
                        className="btn btn-link"
                        style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}
                        onClick={handlePrevImage}
                        disabled={selectedImageIndex === 0}
                    >
                        <FaChevronLeft />
                    </button>
                    <img
                        src={getImageUrl(images[selectedImageIndex]?.originalFileName)}
                        alt={images[selectedImageIndex]?.description}
                        style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                    />
                    <button
                        className="btn btn-link"
                        style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}
                        onClick={handleNextImage}
                        disabled={selectedImageIndex === images.length - 1}
                    >
                        <FaChevronRight />
                    </button>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Images
