import React from 'react';
import NavBarComponent from "./Components/NavBarComponent.jsx";
import LoginFromComponent from "./Components/LoginFromComponent.jsx";
import {Col, Container, Row} from "react-bootstrap";
import ChatListComponent from "./Components/ChatListComponent.jsx";
import {useChatContext} from "./context/ChatContext.jsx";

const App = () => {
    const {isLogin} = useChatContext()
    return (
        <>
            <NavBarComponent/>
            <Container>
                <Row>
                    <Col className='text-center'>
                        {isLogin ? <ChatListComponent/> : <h1>Need Login! for chat</h1>}
                    </Col>
                </Row>
            </Container>
            <LoginFromComponent />
        </>
    );
};

export default App;
