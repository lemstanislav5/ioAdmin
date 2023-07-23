import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export function MessageForm({ socket }) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(2000).emit('messages', value, () => {
      setIsLoading(false);
    });
  }

  return (
         <Col xs={9}>
        <div>Тестовое сообщение</div>
        <Form onSubmit={ onSubmit }>
          <br/>
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea" placeholder="Введите Ваше сообщение" onChange={ e => setValue(e.target.value) }/>
          </Form.Group>
          <Button variant="primary" disabled={ isLoading }>Отправить</Button>{' '}
        </Form>
      </Col>
  );
}