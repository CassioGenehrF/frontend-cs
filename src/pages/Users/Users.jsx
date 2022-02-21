import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'
import "./style.css";
import UserRegisterModal from "./UserRegisterModal";
import UsersList from "./UsersList";
import { AiOutlinePlus  } from 'react-icons/ai';
import api from '../../services/api';

class Users extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            mustUpdate: false,
            users: [],
            filterField: 'name',
            filterQuery: ''
        }
        document.title = 'Usuários';

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    setUsers(data) {
        if (!this.compareObjects(this.state.users, data)) {
            this.setState({ users: data, mustUpdate: false });
        }
    }

    loadUsers() {
        const params = new URLSearchParams();
        if (this.state.filterQuery) {
            params.append(this.state.filterField, this.state.filterQuery);
        }
        
        api.get(`api/user?${params.toString()}`)
            .then(response => {
                this.setUsers(response.data);
            });
    }

    componentDidMount() {
        this.loadUsers();
    }

    componentDidUpdate() {
        this.loadUsers();
    }

    compareObjects(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    handleChange = (e) => {
        if (e.target.value !== this.state.filterField) {
            this.setState({ filterField: e.target.value });
        }
    }

    search(event) {
        var query = event.target.value;
        if (query !== this.state.filterQuery) {
            this.setState({ filterQuery: query });
            this.loadUsers();
        }
    }

    render() { 
        return (
            <>
                <div className='options'>
                    <Button variant="dark" onClick={() => this.setState({ showCreate: true })}>
                        <AiOutlinePlus  />
                    </Button>

                    <Form.Select className="search" onChange={this.handleChange} value={this.state.filterField}>
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="phone">Telefone</option>
                        <option value="birthdate">Nascimento</option>
                        <option value="city">Cidade</option>
                    </Form.Select>

                    <Form.Control className="search" type="text" placeholder="Buscar..." onChange={this.search} />
                </div>
                
                <UserRegisterModal 
                    show={this.state.showCreate}
                    onHide={() => this.setState({ showCreate: false })}
                />
                <UsersList 
                    users={this.state.users}
                    update={() => this.setState({ mustUpdate: true })}
                />
            </>
        );
    }
}

export default Users;