export default (props) => {
  const { users } = props;
  const { chatId, socketId, id, name, online, phone } = users;
  console.log(props, socketId)
  return (
    <>
    <p>{socketId}</p>
    </>
  )
}