import Container from 'react-bootstrap/Container';
import { Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { BsGear } from "react-icons/bs";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {authenticationActionCreator} from '../../redux/actions';

function Menu() {
  const { login } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authenticationActionCreator(null));
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Админпанель</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/messages">Сообщения</Nav.Link>
            <Nav.Link href="/setings">Настройки</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav.Link href="/logout">Выход</Nav.Link>
              {
                login
                  ? <Navbar.Text> Логин: <a href="#login">{login}</a></Navbar.Text>
                  : <Nav.Link href="/login">Вход</Nav.Link>
              }
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;