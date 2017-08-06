import { logError } from "./logger"

export default function handleError(message, error) {
  logError(message, error.name, error.message, error.stack)
}
