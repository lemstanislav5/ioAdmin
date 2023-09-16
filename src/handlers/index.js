export default () => {
  function onConnect(calback) {
    calback(true);
  }

  function onDisconnect(calback) {
    calback(false);
  }

  function onMessage(message) {
    console.log(message)
    // calback(messages => [...messages, value]);
  }
  function getAllUsers(calback, data) {
    calback(data);
  }
}