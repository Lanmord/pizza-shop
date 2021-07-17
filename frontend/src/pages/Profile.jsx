import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, OrderItem, ProfileSkeleton } from '../components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import saveEditIcon from '../assets/img/saveEdit.png';
function Profile() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [userOrders, setUserOrders] = React.useState(null);
  const [toggleEditFullname, setToggleEditFullname] = React.useState(false);
  const editNameRef = React.useRef();

  let history = useHistory();

  const handleOutsideClick = (e) => {
    if (editNameRef && !e.path.includes(editNameRef.current)) {
      setToggleEditFullname(false);
    }
  };

  React.useEffect(() => {
    axios
      .get('/users/me')
      .then(({ data }) => {
        setUserInfo(data.data);

        axios
          .post('/orders/findordersbyid', data.data.orders)
          .then(({ data }) => {
            setUserOrders(data.data);
          })
          .catch(function () {
            return null;
          });
      })
      .catch(function () {
        history.push('/login');
      });
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  const onExit = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div className="content">
      <div className="container">
        {userInfo ? (
          <div className="profile__content">
            <div className="profile__info">
              {!toggleEditFullname ? (
                <div>
                  <h2>{userInfo.fullname}</h2>
                  <svg
                    onClick={() => setToggleEditFullname(!toggleEditFullname)}
                    height="492pt"
                    viewBox="0 0 492.49284 492"
                    width="492pt"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0" />
                    <path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0" />
                  </svg>
                </div>
              ) : (
                <div ref={editNameRef}>
                  <Formik
                    initialValues={{ fullname: userInfo.fullname }}
                    validate={(values) => {
                      const errors = {};
                      if (values.fullname.length < 2 || values.fullname.length > 40) {
                        errors.fullname = 'От 2 до 40 символов.';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      axios
                        .post('/users/' + userInfo._id, { fullname: values.fullname })
                        .then(() => {
                          setUserInfo({ ...userInfo, fullname: values.fullname });
                          setToggleEditFullname(!toggleEditFullname);
                        });

                      setSubmitting(false);
                    }}>
                    {({ isSubmitting }) => (
                      <Form>
                        <div>
                          <Field type="text" name="fullname" />
                          <ErrorMessage name="fullname" component="div" className="reg_error" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                          <img src={saveEditIcon} height="22px" />
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              <span>{userInfo.email}</span>
              <Button onClick={onExit} outline>
                <span>Выход</span>
              </Button>
            </div>
            <div className="profile__list">
              <span>История заказов</span>
              {userOrders !== null && userOrders.length !== 0 ? (
                <div className="orders__list">
                  {userOrders.map((order) => (
                    <OrderItem key={`${order._id}_${order.order_id}`} {...order} />
                  ))}
                </div>
              ) : (
                <span>Нет данных</span>
              )}
            </div>
          </div>
        ) : (
          <ProfileSkeleton />
        )}
      </div>
    </div>
  );
}

export default Profile;
