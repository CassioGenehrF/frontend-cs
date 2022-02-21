import React, { useState } from "react";
import { Button, Table } from 'react-bootstrap'
import "./style.css"
import { RiEraserFill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import CompanyRegisterModal from "../CompanyRegisterModal";
import CompanyDeleteModal from "../CompanyDeleteModal";
import CompanyEmployeesModal from "../CompanyEmployeesModal";

function CompanyList (props) {
    const [editCompany, setEditCompany] = useState(false);
    const [deleteCompany, setDeleteCompany] = useState(false);
    const [company, setCompany] = useState([]);
    const [employees, setEmployees] = useState(false);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CNPJ</th>
                    <th>Endereço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.companies.map((item, key) => {
                    return (
                        <tr key={key}>
                            <td>{item['name']}</td>
                            <td>{item['cnpj']}</td>
                            <td>{item['address']}</td>
                            <td>
                                <Button variant="dark" onClick={() => {
                                        setEditCompany(true);
                                        setCompany(item);
                                    }
                                }>
                                    <FaRegEdit  />
                                </Button>
                                {' '}
                                <Button variant="dark" onClick={() => {
                                        setDeleteCompany(true)
                                        setCompany(item);
                                 
                                    }
                                }>
                                    <RiEraserFill  />
                                </Button>
                                {' '}
                                <Button variant="dark" onClick={() => {
                                        setEmployees(true)
                                        setCompany(item);
                                    }
                                }>
                                    <BsPerson  />
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                <CompanyRegisterModal 
                    company={company} 
                    show={editCompany} 
                    onHide={() => {
                        setEditCompany(false);
                        props.update();
                    }}
                />

                <CompanyDeleteModal 
                    company={company}
                    show={deleteCompany}
                    onHide={() => {
                        setDeleteCompany(false);
                        props.update();
                    }}
                />

                <CompanyEmployeesModal
                    company={company}
                    show={employees}
                    onHide={() => setEmployees(false)}
                />
            </tbody>
        </Table>
    );
}

export default CompanyList;