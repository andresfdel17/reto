import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getPlayerName } from '../../utils/savePoints';

const Header = () => {
    const [name, setName] = useState("player");
    useEffect(() => {
        setName(getPlayerName());
    },[]);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        Arcade Colombia
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <header>

                <h1>Bienvenido {name} a astucia naval</h1>
                <span role="img" aria-label="anchor">
                    ⚓️
                </span>
            </header>
        </div>
    )
}

export default Header