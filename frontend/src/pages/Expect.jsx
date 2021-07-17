import axios from 'axios';
import React from 'react';
import { OrderItem, OrdersSkeleton } from '../components';

function Expect() {
  const [orders, setOrders] = React.useState(null);
  // const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get('/ordersfind', { params: { status: 1 } })
      .then(({ data }) => {
        // setLoading(false);
        setOrders(data.data);
      })
      .catch(() => {
        setOrders(null);
      });
  }, []);
  return (
    <>
      <h3>В ОЖИДАНИИ</h3>

      <div className="profile__list">
        {orders !== null && orders.length !== 0 ? (
          <div className="orders__list">
            {orders.map((order) => (
              <OrderItem
                key={`${order._id}_${order.order_id}`}
                {...order}
                btnName="Принять"
                changeStatus={2}
                setOrdersHandle={setOrders}
              />
            ))}
          </div>
        ) : (
          Array(6)
            .fill(0)
            .map((_, index) => <OrdersSkeleton key={index} />)

          // <span>Нет данных</span>
        )}
      </div>
    </>
  );
}

export default Expect;
