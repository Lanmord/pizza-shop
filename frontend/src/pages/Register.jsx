import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../components';
import { useHistory, Link } from 'react-router-dom';
import { axios } from '../core/axios';

const Register = () => {
  let history = useHistory();
  return (
    <div className="content__reg">
      <div className="container___reg">
        <h2>Регистрация</h2>
        <Formik
          initialValues={{ email: '', password: '', password2: '', fullname: '' }}
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
            if (!values.password2) {
              errors.password2 = 'Обязательное поле';
            } else if (values.password !== values.password2) {
              errors.password2 = 'Пароли не совподают';
            }
            if (!values.fullname) {
              errors.fullname = 'Обязательное поле';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post('/auth/register', values)
              .then(function () {
                axios
                  .post('/auth/login', { username: values.email, password: values.password })
                  .then((response) => {
                    window.localStorage.setItem('token', response.data.data.token);
                    history.push('/profile');
                  })
                  .catch(function (error) {
                    alert(error);
                  });
              })
              .catch(function ({ response }) {
                alert(JSON.stringify(response.data.errors, null, 2));
              });

            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <label>E-mail</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="reg_error" />

              <label>Имя, Фамилия</label>
              <Field type="text" name="fullname" />
              <ErrorMessage name="fullname" component="div" className="reg_error" />

              <label>Пароль</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="reg_error" />

              <label>Подтвердить пароль</label>
              <Field type="password" name="password2" />
              <ErrorMessage name="password2" component="div" className="reg_error" />

              <Button type="submit" disabled={isSubmitting}>
                <span>Регистрация</span>
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="/login">
          <Button outline>Авторизоваться</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
