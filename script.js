let timeZone

const searchSelect = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

const toDegrees = (percent) => percent * 360 + 90
const moveHand = (selector, percent) => {
  document.querySelector(
    selector
  ).style.transform = `rotate(${toDegrees(percent)}deg)`
}
const moveHands = () => {
  if (!timeZone) return
  options = { timeZone }
  const now = new Date(
    new Date().toLocaleString('en-US', options)
  )
  moveHand('.second-hand', now.getSeconds() / 60)
  moveHand('.minute-hand', now.getMinutes() / 60)
  moveHand('.hour-hand', now.getHours() / 12)
}
setInterval(moveHands, 1000)

const toOption = (timeZone) =>
  `<option value="${timeZone}"=>${timeZone}</option>`

const timezones = []
fetch('https://worldtimeapi.org/api/timezone')
  .then((blob) => blob.json())
  .then((data) => {
    timezones.push(...data)
    searchSelect.innerHTML = timezones.map(toOption)
  })

fetch('https://worldtimeapi.org/api/ip')
  .then((blob) => blob.json())
  .then(({ timezone }) => {
    timeZone = timezone
    searchSelect
      .querySelector(`option[value="${timeZone}"]`)
      .setAttribute('selected', '')
  })

searchSelect.addEventListener(
  'change',
  ({ target: { value } }) => {
    fetch(`https://worldtimeapi.org/api/${value}`)
      .then((blob) => blob.json())
      .then(({ timezone }) => {
        timeZone = timezone
      })
  }
)
