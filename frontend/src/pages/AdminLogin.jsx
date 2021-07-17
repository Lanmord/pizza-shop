import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../components';
import { Link } from 'react-router-dom';
import { axios } from '../core/axios';
import { fetchLogin } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

const AdminLogin = ({ history }) => {
  // React.useEffect(() => {
  //   axios.get('/users/me').then(() => {
  //     history.push('/profile');
  //   });
  // }, []);
  const dispatch = useDispatch();

  return (
    <div className="content__reg admin-login">
      <div className="container___reg">
        <h2>Вход в админ-панель</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Обязательное поле';
            }
            if (!values.password) {
              errors.password = 'Обязательное поле';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              fetchLogin(values, () => {
                history.push('/admin');
              }),
            );
            // console.log({ email: values.email, password: values.password });
            // axios
            //   .post('/auth/login', { username: values.email, password: values.password })
            //   .then((response) => {
            //     window.localStorage.setItem('token', response.data.data.token);

            //     history.push('/profile');
            //   })
            //   .catch(function (error) {
            //     alert('Такого пользователя нет в нашей базе данных');
            //   });

            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <label>Логин</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="reg_error" />

              <label>Пароль</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="reg_error" />
              <Button type="submit" disabled={isSubmitting}>
                <span>Войти</span>
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="/">
          <Button outline>Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
