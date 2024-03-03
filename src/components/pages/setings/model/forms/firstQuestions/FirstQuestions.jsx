import style from './FirstQuestions.module.css'


export const FirstQuestions = ({questionsSetings }) => {
  if(questionsSetings.length === 0) return false;
  return(
    <div className={style.container}>
      { questionsSetings.map((item, i) => {
        if(item.offOn === 1) return (
        <div className={style.wrapper} key={i}> 
          <div className={style.question} key={'q' + i}>
            {item.question}
          </div>
        </div>)
        return null;
      } )}
    </div>
  )
}
