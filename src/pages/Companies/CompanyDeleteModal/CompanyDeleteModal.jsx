import React from "react";
import { Button, Modal } from 'react-bootstrap'
import api from "../../../services/api";
import "./style.css"

function CompanyDeleteModal (props) {

    function deleteCompany(id) {
        const element = document.querySelector('#message');

        api.delete(`api/company/${id}`)
            .then(res => {
                element.innerHTML = 'Empresa excluida com sucesso!';
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
            id = props.company.id
    }
    
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <p id="message"></p>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir usuário</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza de que deseja excluir "{name}" ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" type="reset" onClick={props.onHide}>Voltar</Button>
                    <Button variant="dark" type="submit" onClick={() => deleteCompany(id)}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        );
}

export default CompanyDeleteModal;