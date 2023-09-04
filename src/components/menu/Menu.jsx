import Container from 'react-bootstrap/Container';
import { Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { BsGear } from "react-icons/bs";

function Menu() {
  const { login } = useSelector((store) => store.auth);
  const logout = () => {
    console.log(1)
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.clear();
    return <Navigate to="/login" />
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Messenger</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/messages">Сообщения</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav.Link href="#" onClick={logout}>logout</Nav.Link>
              {
                login
                  ? <Navbar.Text> Login: <a href="#login">{login}</a></Navbar.Text>
                  : <Nav.Link href="/login">login</Nav.Link>
              }
              <NavDropdown title={<BsGear size={26} />} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;