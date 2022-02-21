import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'
import "./style.css";
import CompanyRegisterModal from "./CompanyRegisterModal";
import CompaniesList from "./CompaniesList"
import { AiOutlinePlus  } from 'react-icons/ai';
import api from '../../services/api';

class Companies extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            mustUpdate: false,
            companies: [],
            filterField: 'name',
            filterQuery: ''
        }
        document.title = 'Empresas';
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    setCompanies(data) {
        if (!this.compareObjects(this.state.companies, data)) {
            this.setState({ companies: data, mustUpdate: false });
        }
    }

    loadCompanies() {
        const params = new URLSearchParams();
        if (this.state.filterQuery) {
            params.append(this.state.filterField, this.state.filterQuery);
        }

        api.get(`api/company?${params.toString()}`)
            .then(response => {
                this.setCompanies(response.data)
            });
    }

    componentDidMount() {
        this.loadCompanies();
    }

    compareObjects(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    componentDidUpdate() {
        this.loadCompanies();
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
            this.loadCompanies();
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
                        <option value="cnpj">CNPJ</option>
                        <option value="address">Endereço</option>
                    </Form.Select>

                    <Form.Control className="search" type="text" placeholder="Buscar..." onChange={this.search} />
                </div>
                
                <CompanyRegisterModal 
                    show={this.state.showCreate}
                    onHide={() => this.setState({ showCreate: false })}
                />
                <CompaniesList 
                    companies={this.state.companies}
                    update={() => this.setState({ mustUpdate: true })}
                />
            </>
        );
    }
}

export default Companies;