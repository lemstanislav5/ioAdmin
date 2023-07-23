import React from 'react';

export function ConnectionState({ isConnected }) {
  return <p>Подключение к серверу: { ' ' + isConnected }</p>;
}