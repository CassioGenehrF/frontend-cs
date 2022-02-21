import React from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import api from "../../../services/api";
import "./style.css"

function CompanyRegisterModal (props) {
    const onFormSubmit = e => {
        e.preventDefault()
        const company = {
            'name': e.target.name.value,
            'cnpj': e.target.cnpj.value,
            'address': e.target.address.value,
        }
        
        const params = new URLSearchParams();
        params.append('name', company.name);
        params.append('cnpj', company.cnpj);
        params.append('address', company.address);
        
        if (props.company) {
            updateCompany(params);
        } else {
            createCompany(params);
        }
    }

    const createCompany = params => {  
        const element = document.querySelector('#message');
      
        api.post('api/company', params.toString())
            .then(res => {
                element.innerHTML = 'Empresa criada com sucesso!';
                element.style.backgroundColor = "green";
                element.style.color = "white";
                element.style.padding = "10px";
                setTimeout(function () {
                    props.onHide();
                }, 1500);
            })
            .catch(err => {
                element.innerHTML = 'Ocorreu um erro ao processar sua solicitação.';
                element.style.backgroundColor = "red";
                element.style.color = "white";
                element.style.padding = "10px";
                console.log('Erro: ', err);
            });
    }

    const updateCompany = params => {
        const element = document.querySelector('#message');

        api.put(`api/company/${props.company.id}`, params.toString())
            .then(res => {
                element.innerHTML = 'Empresa atualizada com sucesso!';
                element.style.backgroundColor = "green";
                element.style.color = "white";
                element.style.padding = "10px";
                setTimeout(function () {
                    props.onHide();
                }, 1500);
            })
            .catch(err => {
                element.innerHTML = 'Ocorreu um erro ao processar sua solicitação.';
                element.style.backgroundColor = "red";
                element.style.color = "white";
                element.style.padding = "10px";
                console.log('Erro: ', err);
            });
    }

    if (props.company) {
        var name = props.company.name,
            cnpj = props.company.cnpj,
            address = props.company.address;
    }
    
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <p id="message"></p>
            <Form onSubmit={onFormSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" defaultValue={name} />
                        <Form.Text className="text-muted">
                            Obrigatório
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cnpj">
                        <Form.Label>CNPJ:</Form.Label>
                        <Form.Control type="text" defaultValue={cnpj}/>
                        <Form.Text className="text-muted">
                            Obrigatório
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control type="text" defaultValue={address}/>
                        <Form.Text className="text-muted">
                            Obrigatório
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" type="reset" onClick={props.onHide}>
                        Voltar
                    </Button>
                    <Button variant="dark" type="submit">
                        Enviar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CompanyRegisterModal;