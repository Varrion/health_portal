import React, {useState} from "react";
import Toast from 'react-bootstrap/Toast'

function Notification(props) {
    const [show, setShow] = useState(false);

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '100px',
            }}
        >
            <Toast
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                onClose={() => setShow(false)} show={show} delay={3000} autohide
            >
                <Toast.Header>
                    <strong className="mr-auto">{props.title}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </div>
    )
}

export default Notification;