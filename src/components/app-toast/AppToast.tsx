import React from 'react'
import Toast from 'react-bootstrap/Toast';

type ToastProps = {
    show : boolean,
    errorMessage:string
}

function AppToast({show , errorMessage} : ToastProps) {
    return (
        <Toast  show={show} className='bg-danger text-white' data-testid="toast-id">
            <Toast.Header className='bg-danger' closeButton={false}>
                <strong className="mr-auto text-white">Error</strong>
            </Toast.Header>
            <Toast.Body className='text-white'>{errorMessage}</Toast.Body>
        </Toast>
    )
}

export default AppToast
