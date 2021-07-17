import axios from 'axios';

export const fetchLogin = (authInfo, cb) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post('/admins/login', authInfo)
    .then(({
      data
    }) => {
      window.localStorage.setItem('token2', data.data.token);
      dispatch(setAuthStatus(true));

      cb();
    })
    .catch(function () {
      // alert('Такого пользователя нет в нашей базе данных');
      dispatch(setIsLoading(false));
    });

};

export const fetchMe = () => (dispatch) => {
  axios
    .get('/admins/me')
    .then(() => {
      return dispatch(setAuthStatus(true));
    }).catch(() => {
      return dispatch(setAuthStatus(false));
    });
};


export const setAuthStatus = (value) => ({
  type: 'SET_AUTH_STATUS',
  value
});
export const setIsLoading = (value) => ({
  type: 'SET_IS_LOADING',
  value
});