import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Row } from 'react-bootstrap'
import api from "../../../services/api";
import { BsPersonPlus, BsPersonX } from 'react-icons/bs';
import "./style.css"

function CompanyEmployeesModal (props) {
    const [employees, setEmployess] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [usersListFiltered, setUsersListFiltered] = useState([]);
    const [user, setUser] = useState([]);
    
    function loadEmployees() {
        if (props.company.id) {
            api.get(`api/company/${props.company.id}/users`)
                .then(response => {
                    fetchEmployees(response.data.users);
                });
        }
    }

    function loadUsersList() {
        api.get('api/user')
            .then(response => {
                fetchUsersList(response.data);
            });
    }

    function addEmployee() {
        const params = new URLSearchParams();
        params.append('user_id', user);
        params.append('company_id', props.company.id);
        
        api.post('api/company/users', params.toString())
            .then(response => {
                loadEmployees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function removeEmployee(userId) {
        api.delete(`api/company/${props.company.id}/user/${userId}`)
            .then(response => {
                loadEmployees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function compareObjects(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    function fetchUsersList(data) {
        if (!compareObjects(data, usersList)) {
            setUsersList(data);
        }
    }
    
    function fetchEmployees(data) {
        if (!compareObjects(data, employees)) {
            setEmployess(data);
            filterUserslist(data);
        }
    }

    function filterUserslist(data) {
        data.forEach(function (employeeItem) {
            usersList.forEach(function (userItem, key) {
                if (userItem.id === employeeItem.id) {
                    usersList.splice(key, 1);
                }
            })
        });

        setUsersListFiltered(usersList);
        setUser(usersList[0].id);
    }

    useEffect(() => {
        loadEmployees();
    });

    useEffect(() => {
        loadUsersList();
    });
    
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <p id="message"></p>
            <Modal.Header closeButton>
                <Modal.Title>Funcionários</Modal.Title>
            </Modal.Header>
            <Row>
                <select className="addEmployeeSelect" onChange={e => setUser(e.target.value)}>
                    {usersListFiltered.map((item, key) => (
                        <option value={item['id']} key={key}>{item['name']}</option>
                    ))}
                </select>
                <Button className="addEmployee" variant="dark" onClick={() => {
                        addEmployee()
                    }
                }>
                    <BsPersonPlus  />
                </Button>
            </Row>
            <hr/>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item['name']}</td>
                                    <td>{item['email']}</td>
                                    <td>
                                    <Button variant="dark" onClick={() => {
                                            removeEmployee(item['id'])
                                        }
                                    }>
                                        <BsPersonX  />
                                    </Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

export default CompanyEmployeesModal;