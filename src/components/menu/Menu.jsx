import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { BsGear, BsChatRightText, BsBoxArrowInRight, BsBoxArrowRight, BsFillPersonFill } from "react-icons/bs";

function Menu() {
  const { login } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Админпанель</Navbar.Brand>
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
