import { message } from "./message"

export interface LabeledStack {
  error: string
  message: message[]
  success: boolean
}

export interface Labeled {
  error: string
  message: message
  success: boolean
}

