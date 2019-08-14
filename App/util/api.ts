export const api = (path: string, options = {}): Promise<any> => {
  return fetch(`https://jsonplaceholder.typicode.com${path}`, options)
    .then(res => res.json())
    .then(response => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error("Empty Response");
      }

      return response;
    });
};
