import axios from 'axios';

const baseURL = 'https://hslms-dev-api-dot-duruj-351315.uc.r.appspot.com/api/v1/';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      alert(
        `A server/network error occurred. '
          'Looks like CORS might be the problem. '
          'Sorry about this - we will get it fixed shortly.`
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === `${baseURL}auth/refresh`) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      (error.response.statusText === 'Unauthorized' || error.response.statusText === '')
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp > now);

        if (tokenParts.exp > now) {
          axiosInstance
            .post('auth/refresh', { refresh_token: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('refresh_token', response.data.refresh_token);

              axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
              originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        console.log('Refresh token is expired', tokenParts.exp, now);
        window.location.href = '/login';
      }
      console.log('Refresh token not available.');
      window.location.href = '/login';
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
