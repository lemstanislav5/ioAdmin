
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const SocketSection = ({socketSetings, setSocketSetings}) => {
return (
  <Col xs={6}>
    {
      Object.keys(socketSetings).map(name => (
        <InputGroup key={name} className="mb-3">
          <InputGroup.Text>{name}</InputGroup.Text>
          <Form.Control
            defaultValue={socketSetings[name]}
            // value={null}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      ))
    }
  </Col>
)

}