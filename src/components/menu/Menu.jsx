import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { BsGear, BsChatRightText, BsBoxArrowInRight, BsBoxArrowRight, BsFillPersonFill } from "react-icons/bs";
import style from './Menu.module.css';

function Menu() {
  const { login } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="/" className={style.brand}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
          </svg>
          <span> Whisper</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/messages"><BsChatRightText /> Сообщения</Nav.Link>
            <Nav.Link href="/setings"><BsGear /> Настройки</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav.Link href="/logout"><BsBoxArrowInRight /> Выход</Nav.Link>
              {
                login
                  ? <Navbar.Text><BsFillPersonFill /> Логин: <a href="#login">{login}</a></Navbar.Text>
                  : <Nav.Link href="/login"><BsBoxArrowRight /> Вход</Nav.Link>
              }
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
