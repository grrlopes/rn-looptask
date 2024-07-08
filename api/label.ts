const Env = {
  API_ADDR: "192.168.2.26",
  PORT: 8080,
  Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2QwNTdkYjk1OTY1MzU1ZDIzNGM0ZSIsIm5hbWUiOiJiYWxlaWEiLCJzdXJuYW1lIjoid2hhbGVlZWUiLCJlbWFpbCI6ImJhbGVpYUBiYWxlaXJhLmNvbSIsInBhc3N3b3JkIjoiKioqIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDYtMjdUMDY6MjM6NTYuNDc2WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA2LTI3VDA2OjIzOjU2LjQ3NloiLCJleHAiOjE3MjA1NzE0MTQsImlhdCI6MTcyMDM5ODYxNH0._fmf0nU5bU6dzu0svNw3CBo1zWTwrpUEkG1DejTtxhE"
};

const headers = {
  accept: 'application/json',
  // 'Content-Type': 'application/json',
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
  const url = 'http://192.168.2.26:3000/label?id=87ddudk0nm';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Labeled');
  }

  const json = await res.json();
  return json;
};
