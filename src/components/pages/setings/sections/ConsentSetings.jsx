import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const ConsenSection = ({consentSetings, setConsentSetings}) => {
  const handleChange = (event, name) => {
    setConsentSetings({...consentSetings, [name]: event.target.value});
  }

    return (
      <Col xs={4} lg={6} sm={12}>
        <h5>Политика обработки перснальных данных</h5>
        {
          Object.keys(consentSetings).map(name => (
            <InputGroup key={name} className="mb-3">
              <InputGroup.Text>{name}</InputGroup.Text>
              <Form.Control
                value={consentSetings[name]}
                aria-describedby="basic-addon1"
                placeholder={'https://yoursite.com/' + name}
                onChange={(event) => handleChange(event, name)}
              />
            </InputGroup>
          ))
        }
      </Col>
    )
  }
