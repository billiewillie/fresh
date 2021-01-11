// year
const currentTime = new Date()
const getYear = currentTime.getFullYear()
const year = document.querySelector('.year')
if(year) year.innerHTML = getYear