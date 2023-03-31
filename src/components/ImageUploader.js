import React from 'react';
import NavigationBar from './nav/NavigationBar';
import ImageUploadForm from './forms/ImageUploadForm';
import { Container } from 'react-bootstrap';
import Images from './Images';

const ImageUploader = () => {

    return (
        <Container>
            <NavigationBar />
            <ImageUploadForm />
            <Images />
        </Container>
    );
}

export default ImageUploader;
