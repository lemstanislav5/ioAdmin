export const dateMessage = (time) => {
  const i = (item) => {
    if (item < 10) return '0' + item;
    return item;
  }
  let date = new Date(),
      hours = date.getHours(),
      min = date.getMinutes(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
  
  return date.getDate() + '.' + i(month) + '.' + i(year) + ',' + i(hours) + ':' + i(min);
}