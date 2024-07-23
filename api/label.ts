const Env = {
  API_ADDR: "192.168.2.26",
  PORT: 8080,
  Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2QwNTdkYjk1OTY1MzU1ZDIzNGM0ZSIsIm5hbWUiOiJiYWxlaWEiLCJzdXJuYW1lIjoid2hhbGUiLCJlbWFpbCI6ImJhbGVpYUBiYWxlaXJhLmNvbSIsInBhc3N3b3JkIjoiKioqIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDYtMjdUMDY6MjM6NTYuNDc2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA2LTI3VDA2OjIzOjU2LjQ3NloiLCJleHAiOjE3MjE3OTI4NzAsImlhdCI6MTcyMTYyMDA3MH0.ViLAVPZ9mgyYwb2IMGu5kvj_zjE_jnz9zntAJgzpbBs"
};

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + Env.Token,
};

export const fetchAll = async () => {
  const url = `http://${Env.API_ADDR}:${Env.PORT}/listalltraystack`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch labels');
  }

  const json = await res.json();
  return json;
};

export const fetchOneById = async (id: any) => {
  const url = `http://${Env.API_ADDR}:${Env.PORT}/fetchonelabel?id=${id}`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch one label');
  }

  const json = await res.json();

  return json;
};

export const addNewTray = async (data: any) => {
  const url = `http://${Env.API_ADDR}:${Env.PORT}/createlabeled`;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Labeled');
  }

  const json = await res.json();
  return json;
};

export const addNewStackTray = async (data: any) => {
  const url = `http://${Env.API_ADDR}:${Env.PORT}/createlabelstack`;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);
  console.log(res.ok)

  if (!res.ok) {
    throw new Error('Failed to create stack tray');
  }

  const json = await res.json();

  return json;
};
