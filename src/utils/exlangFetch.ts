const EXLANG_API_URL = 'http://localhost:4000/api';

const exlangFetch = async (url: `/${string}`, options: RequestInit = {}) => {
  // eslint-disable-next-line no-restricted-globals
  return fetch(`${EXLANG_API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(localStorage.getItem('token')
        ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
        : {}),
    },
  });
};

export default exlangFetch;
