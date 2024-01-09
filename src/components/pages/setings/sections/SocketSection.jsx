import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const SocketSection = ({socketSetings, setSocketSetings}) => {
const handleChange = (event, name) => {
  setSocketSetings({...socketSetings, [name]: event.target.value});
}

  return (
    <Col xs={4}>
      <h5>Параметры сокета пользователя</h5>
      {
        Object.keys(socketSetings).map(name => (
          <InputGroup key={name} className="mb-3">
            <InputGroup.Text>{name}</InputGroup.Text>
            <Form.Control
              value={socketSetings[name]}
              aria-describedby="basic-addon1"
              onChange={(event) => handleChange(event, name)}
            />
          </InputGroup>
        ))
      }
    </Col>
  )
}