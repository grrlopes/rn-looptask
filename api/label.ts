import { Labeled } from "@/app/(tabs)";

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json'
};

export const fetchAll = async () => {
  const url = `http://192.168.2.26:8080/listalltraystack`;
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
  const url = `http://192.168.2.26:8080/fetchonelabel`;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ id: id })
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
    // body: JSON.stringify({
    //   id: Math.random(),
    //   trayId: Math.random(),
    //   size: "small",
    //   user: "Paul McCarteney",
    //   createdAt: new Date(),
    //   done: false
    // }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Labeled');
  }

  const json = await res.json();
  return json;
};
