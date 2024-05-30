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
    throw new Error('Failed to fetch movies');
  }

  const json = await res.json();
  return json;
};
