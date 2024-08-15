import { User } from "./user"

interface Tray {
  id: string
  trayid: string
  size: string
  userid: User
  done: boolean
  created_at: string
  updated_at: string
}

interface TrayLabel {
  id?: string
  trayid: string
  size: string
  done: boolean
}

export { TrayLabel, Tray }
