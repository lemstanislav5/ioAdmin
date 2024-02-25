export const Top = ({style, colors, SvgImages}) => {
  return(
    <div className={style.box_top} style={{'backgroundColor': colors.top}}>
      <span style={{'color': colors.text}}>
        Напишите ваше сообщение
      </span>
      <div className={style.move}></div>
      <div style={{'color': colors.text}} className={style.backСall}>
        <SvgImages svg={'backСall'}/>
      </div>
      <div className={style.open} style={{'color': colors.text}}>
        <SvgImages svg={'open'}/>
      </div>
    </div>
  )
}
