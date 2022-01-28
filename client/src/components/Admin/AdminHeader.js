import React, {useState, useEffect} from 'react'
import { Button, Tab } from 'semantic-ui-react'
import { Navbar, Container } from 'react-bootstrap';
import { Router, useNavigate, useLocation } from "react-router-dom"

export default function Admin() {

    const location = useLocation()
    let navigate = useNavigate()
    const [logoutStyle, setLogoutStyle] = useState("none")
    const [btnMenuStyle, setBtnMenuStyle] = useState("none")


    useEffect(() => {
        location.pathname === '/' ? setLogoutStyle("none") : setLogoutStyle("block")

        if (location.pathname === '/' || location.pathname === '/admin') {
            setBtnMenuStyle("none")
        } else {
            setBtnMenuStyle("block")
        }
    }, [location])


    const signout = () => {
        navigate(`/`)
    }

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                    <Navbar.Toggle />
                </Container>

                <Button inverted color='blue' 
                        onClick={() => {navigate(`/admin`)}} 
                        style={{display: btnMenuStyle, width: "205px"}}
                >
                    Menu administrateur
                </Button>

                <span onClick={signout} style={{ display: logoutStyle, color: "red", marginLeft: "15px" }}>
                    <i class="fas fa-2x fa-sign-out-alt"></i>
                </span>
            </Navbar>

        </div>
    )
}
