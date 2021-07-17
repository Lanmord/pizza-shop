import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../redux/actions/modal.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../components';
import { axios } from '../core/axios';

function ModalForm() {
  const [orderId, setOrderId] = React.useState(null);
  const isActive = useSelector((state) => state.modal.isActive);
  const { totalPrice, items } = useSelector(({ cart }) => cart);

  // const isActive = useSelector((state) => state.modal.isActive);
  const dispatch = useDispatch();

  const onSetActiveModal = () => {
    dispatch(setActiveModal(false));
    setOrderId(null);
  };

  const [userInfo, setUserInfo] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/users/me')
      .then(({ data }) => {
        setUserInfo(data.data);
      })
      .catch(function () {
        return null;
      });
  }, [isActive]);

  return (
    <div className={isActive ? 'modal active' : 'modal'} onClick={onSetActiveModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {!orderId ? (
          <>
            <h2>Оформить заказ</h2>
            <Formik
              initialValues={{
                location: 'Минск, ст.м. Каменная Горка',
                payment_type: 'Наличные',
                comment: '20 минут',
              }}
              // validate={(values) => {
              //   const errors = {};

              //   return errors;
              // }}
              onSubmit={(values, { setSubmitting }) => {
                values.items = items;
                values.total_price = totalPrice;
                if (userInfo) {
                  axios
                    .post('/orders', values)
                    .then((response) => {
                      setOrderId(response.data.data.order_id);
                      axios
                        .post('/users/' + userInfo._id, {
                          orders: [...userInfo.orders, response.data.data._id],
                        })
                        .catch(function (error) {
                          alert(error);
                        });
                    })
                    .catch(function (error) {
                      alert(JSON.stringify(error.response.data, null, 2));
                    });
                } else {
                  axios
                    .post('/orders', values)
                    .then((response) => {
                      setOrderId(response.data.data.order_id);
                    })
                    .catch(function (error) {
                      alert(JSON.stringify(error.response.data, null, 2));
                    });
                }

                setSubmitting(false);
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <label>Выберите пункт самовывоза</label>
                  <Field as="select" name="location">
                    <option>Минск, ст.м. Каменная Горка</option>
                    <option>Минск, ул. Могилёвская, 12А ст. инст. культуры</option>
                    <option>Минск, ст.м. Кунцевщина</option>
                  </Field>
                  <ErrorMessage name="location" component="div" className="reg_error" />

                  <label>Тип оплаты</label>
                  <Field as="select" name="payment_type">
                    <option>Наличные</option>
                    <option>Картой</option>
                  </Field>
                  <ErrorMessage name="payment_type" component="div" className="reg_error" />

                  <label>Через сколько минут заберёте?</label>
                  <Field as="select" name="comment">
                    <option>20 минут</option>
                    <option>25 минут</option>
                    <option>30 минут</option>
                    <option>35 минут</option>
                    <option>40 минут</option>
                    <option>45 минут</option>
                  </Field>
                  <ErrorMessage name="comment" component="div" className="reg_error" />

                  <Button type="submit" disabled={isSubmitting} className="button--cart">
                    <span>Оформить заказ на {totalPrice.toFixed(2)} р.</span>
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <h1>Ваш заказ: {orderId}</h1>
        )}
      </div>
    </div>
  );
}

export default ModalForm;
