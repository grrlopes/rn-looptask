export interface LogIn {
  error?: null | string;
  message?: {
    created_at: string;
    email: string;
    id: string;
    name: string;
    surname: string;
    token: string;
    updated_at: string;
  };
  success: boolean;
}

export interface Authentication {
  name: string;
  surname: string;
  email: string;
  password: string;
}


