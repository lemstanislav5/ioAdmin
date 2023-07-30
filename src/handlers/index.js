export default (calback) => {
  function onConnect() {
    calback(true);
  }

  function onDisconnect() {
    calback(false);
  }

  function onMessage(value) {
    calback(messages => [...messages, value]);
  }
  function getAllUsers(users) {
    console.log(users);
  }
}