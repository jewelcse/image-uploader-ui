import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import { Badge, ListGroup } from 'react-bootstrap';

const Notifications = () => {
    const [messages, setMessages] = useState([]);
    const [messagesCount, setMessagesCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false); // add state for visibility

    const connectBackend = () => {
        const socket = new WebSocket('ws://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log('WebSocket connection established');
            stompClient.subscribe('/topic/messages', (response) => {
                const newMessage = response.body;
                setMessagesCount((prev) => prev + 1)
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    }

    useEffect(() => {
        connectBackend()
    }, []);

    const handleClick = () => {
        setShowNotifications(!showNotifications);
    }

    return (
        <>
            <Badge bg="secondary" onClick={handleClick} style={{ width: 'auto' }}>
                {messagesCount && <>{messagesCount}</>}
            </Badge>
            {showNotifications && (
                <ListGroup style={{ position: 'absolute', zIndex: 1, right: 0, width: '26%', maxHeight: '200px', overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                        <ListGroup.Item key={index}>{message}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    )
}

export default Notifications;
