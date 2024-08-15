import { Authentication, LogIn } from "@/interfaces/auth";
import { estimate } from "@/interfaces/message";
import { TrayLabel } from "@/interfaces/tray";
import { getUserToken } from "@/store/persistor";

const Env = {
  API_ADDR: "looptask.uk",
  PORT: 443,
  Token: null as LogIn | null,
};

export const initializeEnv = async () => {
  Env.Token = await getUserToken();
};

const headers = async () => {
  if (!Env.Token?.success) {
    await initializeEnv();
  }

  return {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + Env.Token?.message?.token,
  };
};

export const fetchAll = async () => {
  const url = `https://${Env.API_ADDR}:${Env.PORT}/listalltraystack`;
  const options = {
    method: 'GET',
    headers: await headers(),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch labels');
  }

  const json = await res.json();
  return json;
};

export const fetchOneById = async (id: string) => {
  const url = `https://${Env.API_ADDR}:${Env.PORT}/fetchonelabel?id=${id}`;
  const options = {
    method: 'GET',
    headers: await headers(),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch one label');
  }

  const json = await res.json();

  return json;
};

export const addNewTray = async (data: TrayLabel) => {
  const url = `https://${Env.API_ADDR}:${Env.PORT}/createlabeled`;
  const options = {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Labeled');
  }

  const json = await res.json();
  return json;
};

export const addNewStackTray = async (data: estimate) => {
  const url = `https://${Env.API_ADDR}:${Env.PORT}/createlabelstack`;
  const options = {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  return json;
};

export const doLogin = async (auth: Authentication): Promise<LogIn> => {
  const url = `https://${Env.API_ADDR}:${Env.PORT}/login`;
  const options = {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify(auth)
  };

  const res = await fetch(url, options);

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  return json as LogIn;

}
