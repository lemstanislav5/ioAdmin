import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const ConsenSection = ({consentSetings, setConsentSetings}) => {
  const handlerChange = (event, name) => {
    setConsentSetings({...consentSetings, [name]: event.target.value});
  }

    return (
      <Col>
        <h5 className="border-bottom">Политика обработки перснальных данных</h5>
        {
          Object.keys(consentSetings).map(name => (
            <InputGroup key={name} className="mb-3">
              <InputGroup.Text>{name}</InputGroup.Text>
              <Form.Control
                value={consentSetings[name]}
                aria-describedby="basic-addon1"
                placeholder={'https://yoursite.com/' + name}
                onChange={(event) => handlerChange(event, name)}
              />
            </InputGroup>
          ))
        }
      </Col>
    )
  }
