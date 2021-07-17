import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom';
import { Button, ImagePreview } from '../components';
import { Expect, InWork, Done } from './';
import { fetchPizzas } from '../redux/actions/pizzas.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import defaultImg from '../assets/img/pizzaDefault.svg';
import auth from '../core/auth';
import { ProtectedRoute } from '../core/protected.route';

const availableTypes = ['тонкое', 'традиционное'];
// const availableSizes = [26, 30, 40];

function Admin({ history }) {
  let { url, path } = useRouteMatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageCreate, setImageCreate] = React.useState(null);
  const [visibleCreateForm, setVisibleCreateForm] = React.useState(false);
  const fileInputRef = React.useRef();
  const fileInputRef2 = React.useRef();
  const dispatch = useDispatch();

  const removePizza = (pizzaId) => {
    if (window.confirm('Вы действительно хотите удалить пиццу?')) {
      axios.delete('/pizzas/' + pizzaId).then(() => dispatch(fetchPizzas('price', 0)));
    }
  };

  React.useEffect(() => {
    dispatch(fetchPizzas('price', 0));
  }, []);

  return (
    <>
      <div className="container">
        <h2>Административная панель</h2>
      </div>
      <div className="admin_wrap">
        <div className="side__panel">
          <div className="side_element">
            <Link to="/admin">ГЛАВНАЯ</Link>

            <span>Заказы:</span>
            <Link to={`${url}/expect`}>В ОЖИДАНИИ</Link>

            <Link to={`${url}/inwork`}>В РАБОТЕ</Link>

            <Link to={`${url}/done`}>ВЫПОЛНЕННЫЕ</Link>
            <Button
              style={{ marginTop: '20px' }}
              onClick={() => {
                auth.logout(() => {
                  history.push('/');
                });
              }}>
              Выйти
            </Button>
          </div>
        </div>
        <div className="admin__content">
          <Switch>
            <Route path={`${path}/`} exact>
              {visibleCreateForm ? (
                <div className="pizza__item-edit">
                  <Formik
                    initialValues={{
                      name: '',
                      category: '',
                      rating: '',
                      types: '',
                      sizes: '',
                      price: '',
                      image: '',
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (values.types.length === 0) {
                        errors.types = '* Один тип теста должен быть выбран';
                      }
                      if (values.sizes.length === 0) {
                        errors.sizes = '* Один размер пиццы должен быть выбран';
                      }
                      if (!imageCreate) {
                        errors.image = '* Фото обязательное';
                      }
                      if (!values.name) {
                        errors.name = '* Обязательное поле';
                      }
                      if (!values.category) {
                        errors.category = '* Обязательное поле';
                      } else if (values.category > 4 || values.category < 1) {
                        errors.category = '* Категория может быть от 1 до 4';
                      }

                      if (!values.rating) {
                        errors.rating = '* Обязательное поле';
                      } else if (values.rating < 1) {
                        errors.rating = '* Рейтинг может быть от 1';
                      }

                      if (!values.price) {
                        errors.price = '* Обязательное поле';
                      } else if (values.price < 1) {
                        errors.price = '* Цена может быть от 1';
                      }

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      let bodyFormData = new FormData();

                      bodyFormData.set('image', values.file);
                      bodyFormData.set('name', values.name);
                      bodyFormData.set(
                        'types',
                        JSON.stringify(values.types.map((value, idx) => idx)),
                      );
                      bodyFormData.set(
                        'sizes',
                        JSON.stringify(values.sizes.map((value) => Number(value))),
                      );
                      bodyFormData.set('price', values.price);
                      bodyFormData.set('category', values.category);
                      bodyFormData.set('rating', values.rating);

                      axios({
                        method: 'POST',
                        url: '/pizzas',
                        data: bodyFormData,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } },
                      })
                        .then(function () {
                          alert('Пицца добавлена.');
                          dispatch(fetchPizzas('price', 0));
                        })
                        .catch(function (response) {
                          //handle error
                          console.log(response);
                        });

                      setSubmitting(false);
                    }}>
                    {({ isSubmitting, setFieldValue }) => (
                      <Form>
                        <div>
                          <h3>Добавить пиццу</h3>
                          <ImagePreview key={1} baseImg={defaultImg} image={imageCreate} />
                          <Button
                            outline
                            onClick={(e) => {
                              e.preventDefault();
                              fileInputRef2.current.click();
                            }}>
                            Загрузить фото
                          </Button>
                          <input
                            type="file"
                            name="image"
                            accept="image/png, image/jpeg, image/jpg"
                            style={{ display: 'none' }}
                            ref={fileInputRef2}
                            onChange={(e) => {
                              const file = e.target.files[0];

                              if (file) {
                                setImageCreate(file);
                                setFieldValue('file', e.target.files[0]);
                              } else {
                                setImageCreate(null);
                              }
                            }}
                          />
                          <ErrorMessage name="image" component="div" className="reg_error" />
                        </div>
                        <div>
                          <div className="text__fields">
                            <label>Название</label>
                            <Field type="text" name="name" className="custom-input" />
                            <ErrorMessage name="name" component="div" className="reg_error" />

                            <label>Категория</label>
                            <Field type="number" name="category" className="custom-input" />
                            <ErrorMessage name="category" component="div" className="reg_error" />

                            <label>Рейтинг</label>
                            <Field type="number" name="rating" className="custom-input" />
                            <ErrorMessage name="rating" component="div" className="reg_error" />

                            <label>Цена</label>
                            <Field type="number" name="price" className="custom-input" />
                            <ErrorMessage name="price" component="div" className="reg_error" />
                            <div className="group-box">
                              <Button type="submit" disabled={isSubmitting}>
                                Добавить
                              </Button>
                              <Button
                                onClick={() => {
                                  setImageCreate(null);
                                  setVisibleCreateForm(null);
                                }}
                                outline>
                                Отмена
                              </Button>
                            </div>
                          </div>

                          <div className="check__fields">
                            <label>Тип теста</label>
                            <div role="group">
                              <label>
                                <Field type="checkbox" name="types" value="традиционное" />
                                Традиционное
                              </label>
                              <label>
                                <Field type="checkbox" name="types" value="тонкое" />
                                Тонкое
                              </label>
                            </div>
                            <ErrorMessage name="types" component="div" className="reg_error" />

                            <label>Размер пиццы</label>
                            <div role="group">
                              <label>
                                <Field type="checkbox" name="sizes" value="26" />
                                26 см.
                              </label>
                              <label>
                                <Field type="checkbox" name="sizes" value="30" />
                                30 см.
                              </label>
                              <label>
                                <Field type="checkbox" name="sizes" value="40" />
                                40 см.
                              </label>
                            </div>

                            <ErrorMessage name="sizes" component="div" className="reg_error" />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <div className="pizza__add-form" onClick={() => setVisibleCreateForm(true)}></div>
              )}

              {items.map((obj) =>
                selectedItem !== obj._id ? (
                  <div className="pizza__item" key={`${obj._id}_${obj.name}`}>
                    <img src={obj.imageUrl} />
                    <div>
                      <h2>{obj.name}</h2>
                      <span>
                        От {obj.price.toFixed(2)} р.,{' '}
                        {obj.types.length > 1
                          ? 'традиционное и тонкое'
                          : availableTypes[obj.types[0]]}
                        , размеры: {obj.sizes.join(', ')} см., Категория: {obj.category}, Рейтинг:{' '}
                        {obj.rating}.
                      </span>
                      <div>
                        <Button onClick={() => setSelectedItem(obj._id)}>Изменить</Button>
                        <Button outline onClick={() => removePizza(obj._id)}>
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pizza__item-edit" key={`${obj._id}_${obj.name}`}>
                    <Formik
                      initialValues={{
                        name: obj.name,
                        category: obj.category,
                        rating: obj.rating,
                        types:
                          obj.types.length > 1
                            ? ['традиционное', 'тонкое']
                            : [availableTypes[obj.types[0]]],

                        sizes: obj.sizes.map((value) => value.toString()),
                        price: obj.price,
                        image: '',
                      }}
                      validate={(values) => {
                        const errors = {};
                        if (values.types.length === 0) {
                          errors.types = '* Один тип теста должен быть выбран';
                        }
                        if (values.sizes.length === 0) {
                          errors.sizes = '* Один размер пиццы должен быть выбран';
                        }
                        // if (!image) {
                        //   errors.image = '* Фото обязательное';
                        // }
                        if (!values.name) {
                          errors.name = '* Обязательное поле';
                        }
                        if (!values.category) {
                          errors.category = '* Обязательное поле';
                        } else if (values.category > 4 || values.category < 1) {
                          errors.category = '* Категория может быть от 1 до 4';
                        }

                        if (!values.rating) {
                          errors.rating = '* Обязательное поле';
                        } else if (values.rating < 1) {
                          errors.rating = '* Рейтинг может быть от 1';
                        }

                        if (!values.price) {
                          errors.price = '* Обязательное поле';
                        } else if (values.price < 1) {
                          errors.price = '* Цена может быть от 1';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        let bodyFormData = new FormData();

                        bodyFormData.set('image', values.file);
                        bodyFormData.set('name', values.name);
                        bodyFormData.set(
                          'types',
                          JSON.stringify(values.types.map((value, idx) => idx)),
                        );
                        bodyFormData.set(
                          'sizes',
                          JSON.stringify(values.sizes.map((value) => Number(value))),
                        );
                        bodyFormData.set('price', values.price);
                        bodyFormData.set('category', values.category);
                        bodyFormData.set('rating', values.rating);

                        axios({
                          method: 'PATCH',
                          url: '/pizzas/' + selectedItem,
                          data: bodyFormData,
                          config: { headers: { 'Content-Type': 'multipart/form-data' } },
                        })
                          .then(function () {
                            setSelectedItem(null);
                            dispatch(fetchPizzas('price', 0));
                          })
                          .catch(function (response) {
                            //handle error
                            console.log(response);
                          });

                        setSubmitting(false);
                      }}>
                      {({ isSubmitting, setFieldValue }) => (
                        <Form>
                          <div>
                            <h3>Изменить пиццу</h3>
                            <ImagePreview key={2} baseImg={obj.imageUrl} image={image} />
                            <Button
                              outline
                              onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current.click();
                              }}>
                              Загрузить фото
                            </Button>
                            <input
                              type="file"
                              name="image"
                              accept="image/png, image/jpeg, image/jpg"
                              style={{ display: 'none' }}
                              ref={fileInputRef}
                              onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                  setImage(file);
                                  setFieldValue('file', e.target.files[0]);
                                } else {
                                  setImage(null);
                                }
                              }}
                            />
                            <ErrorMessage name="image" component="div" className="reg_error" />
                          </div>
                          <div>
                            <div className="text__fields">
                              <label>Название</label>
                              <Field type="text" name="name" className="custom-input" />
                              <ErrorMessage name="name" component="div" className="reg_error" />

                              <label>Категория</label>
                              <Field type="number" name="category" className="custom-input" />
                              <ErrorMessage name="category" component="div" className="reg_error" />

                              <label>Рейтинг</label>
                              <Field type="number" name="rating" className="custom-input" />
                              <ErrorMessage name="rating" component="div" className="reg_error" />

                              <label>Цена</label>
                              <Field type="number" name="price" className="custom-input" />
                              <ErrorMessage name="price" component="div" className="reg_error" />
                              <div className="group-box">
                                <Button type="submit" disabled={isSubmitting}>
                                  Сохранить
                                </Button>
                                <Button
                                  onClick={() => {
                                    setImage(null);
                                    setSelectedItem(null);
                                  }}
                                  outline>
                                  Отмена
                                </Button>
                              </div>
                            </div>

                            <div className="check__fields">
                              <label>Тип теста</label>
                              <div role="group">
                                <label>
                                  <Field type="checkbox" name="types" value="традиционное" />
                                  Традиционное
                                </label>
                                <label>
                                  <Field type="checkbox" name="types" value="тонкое" />
                                  Тонкое
                                </label>
                              </div>
                              <ErrorMessage name="types" component="div" className="reg_error" />

                              <label>Размер пиццы</label>
                              <div role="group">
                                <label>
                                  <Field type="checkbox" name="sizes" value="26" />
                                  26 см.
                                </label>
                                <label>
                                  <Field type="checkbox" name="sizes" value="30" />
                                  30 см.
                                </label>
                                <label>
                                  <Field type="checkbox" name="sizes" value="40" />
                                  40 см.
                                </label>
                              </div>

                              <ErrorMessage name="sizes" component="div" className="reg_error" />
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                ),
              )}
            </Route>

            <Route path={`${path}/expect`} component={Expect} exact />
            <Route path={`${path}/inwork`} component={InWork} exact />
            <Route path={`${path}/done`} component={Done} exact />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Admin;
