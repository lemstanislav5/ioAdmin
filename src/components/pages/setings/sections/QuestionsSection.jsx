import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';


export const QuestionsSection = ({questionsSetings, setQuestionsSetings}) => {
  const [newQuestion, setNewQuestion] = useState('')

  const handleChangeQuestions = (event, id) => {
    setQuestionsSetings([...questionsSetings.map(item => {
      if(item.id === id) return {...item, question: event.target.value}
      return item;
    })]);
  }
  const handleChangeActivation = (OffOn, id) => {
    setQuestionsSetings([...questionsSetings.map(item => {
      if(item.id === id) return {...item, OffOn: (OffOn === 1)? 0: 1}
      return item;
    })]);
  }
  const addQuestion = (e) => {
    const id = questionsSetings.length + 1;
    setQuestionsSetings([...questionsSetings, {id, question: newQuestion, OffOn: 1}])
    setNewQuestion('');
  }
  const delQuestion = id => {
    setQuestionsSetings([...questionsSetings.reduce((acc, item) => {
      if(item.id !== id) return [...acc, item];
      return acc;
    }, [])]);
  }

    return (
      <Col xs={4} lg={6} sm={12}>
        <h5 className="border-bottom">Вопросы для пользователя</h5>
        <Row  className="mb-3">
          <Col xs={1}>№</Col>
          <Col xs={9}>Вопросы</Col>
          <Col xs={1}>On</Col>
          <Col xs={1}>Del</Col>
        </Row>
        {
          questionsSetings.map((item, i) => (
            <Form key={i}>
              <Row>
                <Col xs={1}>
                  <Form.Label className="mb-3">{item.id}</Form.Label>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    className="mb-3"
                    value={item.question}
                    placeholder={'Задайте вопрос'}
                    onChange={e => handleChangeQuestions(e, item.id)}
                  />
                </Col>
                <Col xs={1}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    className="mb-3"
                    defaultChecked={item.OffOn === 1}
                    onChange={() => handleChangeActivation(item.OffOn, item.id)}
                  />
                </Col>
                <Col xs={1}>
                  <Button onClick={() => delQuestion(item.id)} variant="outline-light">X</Button>
                </Col>
              </Row>
            </Form>
          ))
        }
        <InputGroup className="mb-3">
          <Form.Control
            value={newQuestion}
            placeholder="Новый вопрос"
            onChange={e => {setNewQuestion(e.target.value)}}
          />
          <Button onClick={addQuestion} className="btn-primary">
            Добавить
          </Button>
        </InputGroup>
      </Col>
    )
  }
