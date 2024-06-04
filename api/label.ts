const headers = {
  accept: 'application/json',
};

export const fetchAll = async () => {
  const url = `http://192.168.2.26:3000/label`;
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

export const fetchOneById = async (id: string) => {
  const url = `http://192.168.2.26:3000/label?id=${id}`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch one label');
  }

  const json = await res.json();

  return json[0];
};
