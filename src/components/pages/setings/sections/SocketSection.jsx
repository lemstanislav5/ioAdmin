import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const SocketSection = ({socketSetings, setSocketSetings}) => {
const handlerChange = (event, name) => {
  setSocketSetings({...socketSetings, [name]: event.target.value});
}

  return (
    <Col xs={4} lg={6} sm={12}>
      <h5 className="border-bottom">Параметры сокета пользователя</h5>
      {
        Object.keys(socketSetings).map(name => (
          <InputGroup key={name} className="mb-3">
            <InputGroup.Text>{name}</InputGroup.Text>
            <Form.Control
              value={socketSetings[name]}
              aria-describedby="basic-addon1"
              onChange={(event) => handlerChange(event, name)}
            />
          </InputGroup>
        ))
      }
    </Col>
  )
}
