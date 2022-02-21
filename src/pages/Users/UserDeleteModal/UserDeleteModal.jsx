import React from "react";
import { Button, Modal } from 'react-bootstrap'
import api from "../../../services/api";
import "./style.css"

function UserDeleteModal (props) {

    function deleteUser(id) {
        api.delete(`api/user/${id}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log('Erro: ', err);
            });
    }

    if (props.user) {
        var name = props.user.name,
            id = props.user.id
    }
    
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Excluir usuário</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza de que deseja excluir "{name}" ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" type="reset" onClick={props.onHide}>Voltar</Button>
                    <Button variant="dark" type="submit" onClick={() => deleteUser(id)}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        );
}

export default UserDeleteModal;