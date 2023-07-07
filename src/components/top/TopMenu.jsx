import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function TopMenu() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Online consultant messenger</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/signin">Вход</Nav.Link>
            <Nav.Link href="/signun">Регистрация</Nav.Link>
            <Nav.Link href="#info">Информация</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopMenu;