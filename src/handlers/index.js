export default () => {
  function onConnect(calback) {
    calback(true);
  }

  function onDisconnect(calback) {
    calback(false);
  }

  function onMessage(calback, value) {
    calback(messages => [...messages, value]);
  }
  function getAllUsers(calback, data) {
    calback(data);
  }
}