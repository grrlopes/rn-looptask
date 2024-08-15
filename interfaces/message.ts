import { Tray } from "./tray"
import { User } from "./user"

interface message {
  id: string
  trays: Tray[]
  created_at: string
  updated_at: string
  owner: User
  estimate: {
    small: number,
    large: number
  }
  tray_count: number
  small_count: number
  large_count: number
}

interface estimate {
  small: number,
  large: number,
}

export { estimate, message }
