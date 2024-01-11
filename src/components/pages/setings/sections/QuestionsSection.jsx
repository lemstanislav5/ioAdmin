import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


export const QuestionsSection = ({questionsSetings, setQuestionsSetings}) => {
  //onOff
  console.log(Object.keys(questionsSetings), questionsSetings)
  const handleChange = (event, name) => {
    // setConsentSetings({...questionsSetings, [name]: event.target.value});
  }

    return (
      <Col xs={4} lg={6} sm={12}>
        <h5>Вопросы для пользователя</h5>
        <Row  className="mb-3">
          <Col xs={1}>Id</Col>
          <Col xs={7}>Вопросы</Col>
          <Col xs={1}>OffOn</Col>
        </Row>
        {
          questionsSetings.map((item, i) => (
            <Form key={i} className="mb-3">
              <Row>
                <Col xs={1}>
                  <Form.Label>{item.id}</Form.Label>
                </Col>
                <Col xs={7}>
                  <Form.Control
                    value={item.question}
                    placeholder={'Задайте пример вопроса'}
                    onChange={() => {}}
                  />
                </Col>
                <Col xs={1}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                  />
                </Col>
              </Row>
            </Form>
          ))
        }
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Добавить новый вопрос!"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
      </Col>
    )
  }
