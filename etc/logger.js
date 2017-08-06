import moment from "moment"

export function logError(...messages) {
  messages.forEach(message => {
    console.error(`${moment().format()}: ERROR: ${message}`)
  })
}

export function log(...messages) {
  messages.forEach(message => {
    console.log(`${moment().format()}: ${message}`)
  })
}
