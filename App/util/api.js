export const api = (path, options = {}) => {
  return fetch(`https://jsonplaceholder.typicode.com${path}`, options)
    .then(res => res.json())
    .then(response => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error("Empty Response");
      }

      return response;
    });
};
