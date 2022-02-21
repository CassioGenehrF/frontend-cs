import React, { useState, useEffect } from "react";
import { Table, Modal } from 'react-bootstrap'
import api from "../../../services/api";
import "./style.css"

function UserCompaniesModal (props) {
    const [companies, setCompanies] = useState([]);
    
    const loadCompanies = () => {
        if (props.user.id) {
            api.get(`api/user/${props.user.id}/companies`)
                .then(response => {
                    fetch(response.data.companies);
                });
        }
    }

    const compareObjects = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    
    const fetch = (data) => {
        if (!compareObjects(data, companies)) {
            setCompanies(data);
        }
    }

    useEffect(() => {
        loadCompanies();
    });
    
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <p id="message"></p>
            <Modal.Header closeButton>
                <Modal.Title>Empresas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item['name']}</td>
                                    <td>{item['cnpj']}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

export default UserCompaniesModal;