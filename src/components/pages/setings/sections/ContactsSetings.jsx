import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const ContactsSetings = ({contactsSetings, setContactsSetings}) => {

  const handlerChangeContacts = (event, id) => {
    setContactsSetings([...contactsSetings.map(item => {
      if(item.id === id) return {...item, link: event.target.value};
      return item;
    })]);
  }
  const handlerChangeActivation = (offOn, id) => {
    setContactsSetings([...contactsSetings.map(item => {
      if(item.id === id) return {...item, offOn: (offOn === 1)? 0: 1};
      return item;
    })]);
  }

  const delContacts = id => {
    setContactsSetings([...contactsSetings.reduce((acc, item) => {
      if(item.id !== id) return [...acc, item];
      return acc;
    }, [])]);
  }

    return (
      <Col>
        <h5 className="border-bottom">Ссылки на другие ресурсы</h5>
        <Row  className="mb-3">
          <Col xs={1}>№</Col>
          <Col xs={2}>Название</Col>
          <Col xs={7}>Вопросы</Col>
          <Col xs={1}>On</Col>
          <Col xs={1}>Del</Col>
        </Row>
        {
          contactsSetings.map((item, i) => (
            <Form key={i}>
              <Row>
                <Col xs={1}>
                  <Form.Label className="mb-3">{item.id}</Form.Label>
                </Col>
                <Col xs={2}>
                  <Form.Label className="mb-3">{item.socialNetwork}</Form.Label>
                </Col>
                <Col xs={7}>
                  <Form.Control
                    className="mb-3"
                    value={item.link}
                    placeholder={'Ссылка'}
                    onChange={e => handlerChangeContacts(e, item.id)}
                  />
                </Col>
                <Col xs={1}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    className="mb-3"
                    defaultChecked={item.offOn === 1}
                    onChange={() => handlerChangeActivation(item.offOn, item.id)}
                  />
                </Col>
                <Col xs={1}>
                  <Button onClick={() => delContacts(item.id)} variant="outline-light">X</Button>
                </Col>
              </Row>
            </Form>
          ))
        }
      </Col>
    )
  }
