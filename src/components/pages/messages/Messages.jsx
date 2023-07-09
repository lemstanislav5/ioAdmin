import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Messages() {
  return (
    
    <Row>
      <Col xs={3}>
        <div>
          <div>Тест</div>
          <div>Онлайн</div>
        </div>
      </Col>
      
      <Col xs={9}>
        <div>Тестовое сообщение</div>
        <Form>
          <br/>
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea" placeholder="Введите Ваше сообщение" />
          </Form.Group>
          <Button variant="primary">Отправить</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}