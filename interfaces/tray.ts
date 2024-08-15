import { User } from "./user"

export interface Tray {
  id: string
  trayid: string
  size: string
  userid: User
  done: boolean
  created_at: string
  updated_at: string
}

export interface TrayLabel {
  id?: string
  trayid: string
  size: string
  done: boolean
}


