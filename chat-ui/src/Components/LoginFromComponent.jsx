import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";

const LoginFromComponent = () => {
    const {modal,hideModal,login} = useChatContext()
    const [user,setUser] = useState({
        nickName: '',
    })
    const onLogin = ()=>{
        login(user)
        setUser({ nickName: ''})
    }
    return (
        <Modal
            show={modal}
            onHide={hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        onChange={(e)=>setUser({...user, nickName:e.target.value})}
                        value={user.nickName}
                        type="text"
                        placeholder="Enter your nickname" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>Close</Button>
                <Button variant="primary"
                        onClick={onLogin}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginFromComponent;