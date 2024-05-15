import React from "react";
import { useState } from "react";

import './Modal.css';

const Modal = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal)

    return (
        <div className='modal-container'>
            <button onClick={toggleModal}>Open modal</button>
            {modal && (
                <div className='overlay'>
                    <div className='modal'>
                        <div className='heading'>
                            <span>Back button maybe?</span>
                            <h2>Modal title</h2>
                            <button onClick={toggleModal} className='close'>Close</button>
                        </div>
                        <p>This is just a simple test for the modal</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal;