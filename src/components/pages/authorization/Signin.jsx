import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Signin() {
  return (
    <Row className="justify-content-md-center" >
      <Col xs={3}>
        <Form>
          <br/>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="*********" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="*********" />
          </Form.Group>
          <Button variant="primary">Вйти</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}