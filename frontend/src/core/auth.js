import axios from "axios";

class Auth {
  constructor() {
    // axios
    //   .get('/admins/me')
    //   .then(() => {

    //     this.auth = true;
    //   }).catch(() => {
    //     this.auth = false;
    //     console.log(12212);
    //   });
    this.auth = false;


  }

  login(cb, username, password) {
    axios
      .post('/admins/login', {
        username,
        password
      })
      .then(({
        data
      }) => {
        window.localStorage.setItem('token2', data.data.token);
        this.auth = true;
        cb();
      })
      .catch(function () {
        alert('Такого пользователя нет в нашей базе данных');
      });


  }

  logout(cb) {
    window.localStorage.removeItem('token2');
    this.auth = false;
    cb();
  }

  isAuthenticated() {
    return this.auth;
    // axios
    //   .get('/admins/me')
    //   .then(() => {
    //     console.log(231);
    //     return true;
    //   }).catch(() => {
    //     console.log(2332131231);

    //     return false;
    //   });
  }
}
export default new Auth();