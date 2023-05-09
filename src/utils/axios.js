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
      // alert(`A server error occurred. Sorry about this - we will get it fixed shortly.`);

      window.location.reload();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === `${baseURL}auth/refresh`) {
      console.log('auth-refresh', error);
      localStorage.removeItem('refresh_token');

      const prevLocation = window.location;
      window.location.href = `/login?redirectTo=${prevLocation.pathname}`;
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      console.log('auth-access', error);

      localStorage.removeItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          const postData = { refresh_token: refreshToken };

          return axios
            .post(`${baseURL}auth/refresh/`, postData)
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
        console.log('Refresh token expired.', tokenParts.exp < now);
        const prevLocation = window.location;
        window.location.href = `/login?redirectTo=${prevLocation.pathname}`;
      }
      console.log('Refresh token not available.');
      const prevLocation = window.location;
      window.location.href = `/login?redirectTo=${prevLocation.pathname}`;
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
