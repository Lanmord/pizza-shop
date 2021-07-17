import axios from 'axios';
import React from 'react';
import { OrderItem, OrdersSkeleton } from '../components';

function Done() {
  const [orders, setOrders] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/ordersfind', { params: { status: 3 } })
      .then(({ data }) => {
        setOrders(data.data);
      })
      .catch(() => {
        setOrders(null);
      });
  }, []);
  return (
    <>
      <h3>ВЫПОЛНЕННЫЕ</h3>
      <div className="profile__list">
        {orders !== null && orders.length !== 0 ? (
          <div className="orders__list">
            {orders.map((order) => (
              <OrderItem
                key={`${order._id}_${order.order_id}`}
                {...order}
                btnNameReturn="В работе"
                returnStatus={2}
                setOrdersHandle={setOrders}
              />
            ))}
          </div>
        ) : (
          Array(6)
            .fill(0)
            .map((_, index) => <OrdersSkeleton key={index} />)
        )}
      </div>
    </>
  );
}

export default Done;
