import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
// import React, { useState } from 'react';


export const QuestionsSection = ({questionsSetings, setQuestionsSetings}) => {
  console.log(questionsSetings)

  const handleChangeQuestions = (event) => {
    console.log(event.target)
    // setConsentSetings({...questionsSetings, [name]: event.target.value});
  }
  const handleChangeActivation = (event, id) => {
    const value = event.target.value;
    setQuestionsSetings([...questionsSetings.map(item => {
      let res = (value === 'on')? 0: 1;
      console.log(res, event.target.value)
      if(item.id === id) return {...item, OffOn: res}
      return item;
    })]);
  }

    return (
      <Col xs={4} lg={6} sm={12}>
        <h5 className="border-bottom">Вопросы для пользователя</h5>
        <Row  className="mb-3">
          <Col xs={1}>№</Col>
          <Col xs={9}>Вопросы</Col>
          <Col xs={1}></Col>
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
                    placeholder={'Задайте пример вопроса'}
                    onChange={handleChangeQuestions}
                  />
                </Col>
                <Col xs={1}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={item.OffOn}
                    className="mb-3"
                    check={item.OffOn === 1}
                    checked={item.OffOn === 1}
                    onChange={e => handleChangeActivation(e, item.id)}
                  />
                </Col>
              </Row>
            </Form>
          ))
        }
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Новый вопрос!"
          />
          <Button className="btn-primary">
            Добавить
          </Button>
        </InputGroup>
      </Col>
    )
  }
