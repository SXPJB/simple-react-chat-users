import React from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";

const NavBarComponent = () => {
    const {showModal,user,isLogin,logout} = useChatContext()
    return (
        <>
            <Navbar className='bg-light'>
                <Container fluid>
                    <Navbar.Brand>Hello: {user.nickName}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            onClick={isLogin? logout: showModal}
                            variant={isLogin?"outline-danger":"outline-success"}>
                            {isLogin ? 'Logout' : 'Login'}
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComponent;