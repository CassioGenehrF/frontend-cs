import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./style.css";

class Header extends Component { 
    render() { 
        return (
            <div>
                <div className="logo"/>
                <Button variant="dark" href='/usuarios'>Usuários</Button>{' '}
                <Button variant="dark" href='/empresas'>Empresas</Button>
            </div>
        );
    }
}

export default Header;