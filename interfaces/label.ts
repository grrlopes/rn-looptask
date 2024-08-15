import { message } from "./message"

interface LabeledStack {
  error: string
  message: message[]
  success: boolean
}

interface Labeled {
  error: string
  message: message
  success: boolean
}

export { Labeled, LabeledStack }
