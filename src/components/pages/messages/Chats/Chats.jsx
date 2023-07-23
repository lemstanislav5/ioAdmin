import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export function Chats({ socket }) {
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
    <Col xs={3}>
      <div>Тестовое сообщение</div>
      
    </Col>
  );
}