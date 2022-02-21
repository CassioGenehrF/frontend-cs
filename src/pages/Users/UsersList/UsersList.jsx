import React, { useState } from "react";
import { Button, Table } from 'react-bootstrap'
import "./style.css"
import { RiEraserFill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { MdWorkOutline } from 'react-icons/md';
import UserRegisterModal from "../UserRegisterModal";
import UserDeleteModal from "../UserDeleteModal";
import UserCompaniesModal from "../UserCompaniesModal";

function UsersList (props) {
    const [editUser, setEditUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [user, setUser] = useState([]);
    const [companies, setCompanies] = useState(false);

    const formatDate = (date) => {
        var formatedDate = new Date(date);
        var day = formatedDate.getDate() < 10 ? '0'+formatedDate.getDate() : formatedDate.getDate();
        var month = formatedDate.getMonth() + 1;
        month = month < 10 ? '0'+month : month;
        return day + "/" + month + "/" + formatedDate.getFullYear();
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Nascimento</th>
                    <th>Cidade</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((item, key) => {
                    return (
                        <tr key={key}>
                            <td>{item['name']}</td>
                            <td>{item['email']}</td>
                            <td>{item['phone']}</td>
                            <td>{formatDate(item['birthdate'])}</td>
                            <td>{item['city']}</td>
                            <td>
                                <Button variant="dark" onClick={() => {
                                        setEditUser(true);
                                        setUser(item);
                                    }
                                }>
                                    <FaRegEdit  />
                                </Button>
                                {' '}
                                <Button variant="dark" onClick={() => {
                                        setDeleteUser(true)
                                        setUser(item);
                                 
                                    }
                                }>
                                    <RiEraserFill  />
                                </Button>
                                {' '}
                                <Button variant="dark" onClick={() => {
                                        setCompanies(true)
                                        setUser(item);
                                    }
                                }>
                                    <MdWorkOutline  />
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                <UserRegisterModal 
                    user={user} 
                    show={editUser} 
                    onHide={() => {
                        setEditUser(false);
                        props.update();
                    }}
                />

                <UserDeleteModal 
                    user={user}
                    show={deleteUser}
                    onHide={() => {
                        setDeleteUser(false);
                        props.update();
                    }}
                />

                <UserCompaniesModal
                    user={user}
                    show={companies}
                    onHide={() => setCompanies(false)}
                />
            </tbody>
        </Table>
    );
}

export default UsersList;