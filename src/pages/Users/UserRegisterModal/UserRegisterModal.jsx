import React from "react";
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import api from "../../../services/api";
import "./style.css"

function UserRegisterModal (props) {
    const onFormSubmit = e => {
        e.preventDefault()
        const user = {
            'name': e.target.name.value,
            'email': e.target.email.value,
            'phone': e.target.phone.value,
            'birthdate': e.target.birthdate.value,
            'city': e.target.city.value
        }
        
        const params = new URLSearchParams();
        params.append('name', user.name);
        params.append('email', user.email);
        params.append('phone', user.phone);
        params.append('birthdate', user.birthdate);
        params.append('city', user.city);

        if (props.user.id) {
            updateUser(params);
        } else {
            createUser(params);
        }
    }

    const createUser = params => {  
        const element = document.querySelector('#message');
      
        api.post('api/user', params.toString())
            .then(res => {
                element.innerHTML = 'Usuário criado com sucesso!';
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

    const updateUser = params => {
        const element = document.querySelector('#message');

        api.put(`api/user/${props.user.id}`, params.toString())
            .then(res => {
                element.innerHTML = 'Usuário atualizado com sucesso!';
                element.style.backgroundColor = "green";
                element.style.color = "white";
                element.style.padding = "10px";
                setTimeout(function () {
                    props.history.push('/');
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

    if (props.user) {
        var name = props.user.name,
            email = props.user.email,
            phone = props.user.phone,
            birthdate = props.user.birthdate,
            city = props.user.city;
    }
    
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <p id="message"></p>
            <Form onSubmit={onFormSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" defaultValue={name} />
                        <Form.Text className="text-muted">
                            Obrigatório
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" defaultValue={email}/>
                        <Form.Text className="text-muted">
                            Obrigatório
                        </Form.Text>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control type="phone" defaultValue={phone}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="birthdate">
                                <Form.Label>Data de nascimento:</Form.Label>
                                <Form.Control type="date" defaultValue={birthdate}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>Cidade onde nasceu:</Form.Label>
                        <Form.Control type="text" defaultValue={city}/>
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

export default UserRegisterModal;