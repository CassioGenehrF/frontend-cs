import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Users from './pages/Users';
import { Component } from 'react';
import Companies from './pages/Companies';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <section className="conteudo">
                <div className="container">
                    <Router>
                        <Header/>
                        <hr />
                        <Routes>
                            <Route path='/usuarios' element={<Users/>}/>
                            <Route path='/empresas' element={<Companies/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/usuarios" />}
                            />
                        </Routes>
                    </Router>
                </div>
            </section>
        );
    }
}

export default App;