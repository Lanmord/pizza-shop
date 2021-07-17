import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../components';
import { useHistory, Link } from 'react-router-dom';
import { axios } from '../core/axios';

const Login = () => {
  let history = useHistory();

  React.useEffect(() => {
    axios.get('/users/me').then(() => {
      history.push('/profile');
    });
  }, []);

  return (
    <div className="content__reg">
      <div className="container___reg">
        <h2>Вход</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Обязательное поле';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Неправильный email';
            }
            if (!values.password) {
              errors.password = 'Обязательное поле';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // console.log({ email: values.email, password: values.password });
            axios
              .post('/auth/login', { username: values.email, password: values.password })
              .then((response) => {
                window.localStorage.setItem('token', response.data.data.token);

                history.push('/profile');
              })
              .catch(function (error) {
                alert('Такого пользователя нет в нашей базе данных');
              });

            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <label>E-mail</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="reg_error" />

              <label>Пароль</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="reg_error" />
              <Button type="submit" disabled={isSubmitting}>
                <span>Войти</span>
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="/register">
          <Button outline>Регистрация</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
