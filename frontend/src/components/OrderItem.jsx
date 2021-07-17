import React, { useRef } from 'react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import Button from './Button';
import axios from 'axios';

const statusValues = [
  { color: '#f10000', name: 'в ожидании' },
  { color: '#0070f1', name: 'принят' },
  { color: '#02c202', name: 'готов' },
];

function OrderItem({
  _id,
  createdAt,
  order_id,
  location,
  comment,
  items,
  payment_type,
  total_price,
  status,
  btnName,
  changeStatus,
  setOrdersHandle,
  btnNameReturn,
  returnStatus,
}) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onReturnStatus = () => {
    axios
      .patch('/orders/' + _id, { status: returnStatus })
      .then(({ data }) => {
        // alert('Статус изменён.');
        axios
          .get('/ordersfind', { params: { status: returnStatus + 1 } })
          .then(({ data }) => {
            setOrdersHandle(data.data);
          })
          .catch(() => {
            setOrdersHandle(null);
          });
      })
      .catch(() => {
        alert('Статус не был изменён!');
      });
  };

  const onChangeStatus = () => {
    axios
      .patch('/orders/' + _id, { status: changeStatus })
      .then(({ data }) => {
        // alert('Статус изменён.');
        axios
          .get('/ordersfind', { params: { status: changeStatus - 1 } })
          .then(({ data }) => {
            setOrdersHandle(data.data);
          })
          .catch(() => {
            setOrdersHandle(null);
          });
      })
      .catch(() => {
        alert('Статус не был изменён!');
      });
  };
  let count = 0;
  return (
    <div className="order___item" ref={componentRef}>
      <div className="order___header">
        <div>
          <span>{format(new Date(createdAt), 'dd.MM.yyyy HH:mm')}</span>
          <span>ООО "Нравитцца"</span>
        </div>
        <div className="order___label" style={{ backgroundColor: statusValues[status - 1].color }}>
          <span>{statusValues[status - 1].name}</span>
        </div>
      </div>
      <div className="order___block">
        <span>Заказ №{order_id}</span>
        <span>{location}</span>
      </div>
      <div className="order___block">
        <span>Комментарий:</span>
        <span>{comment}</span>
      </div>
      <div className="order___block">
        {Object.entries(items)
          .map((item, itemIdx) =>
            item[1].pizzasType.map((typeObj, typeIdx) => {
              count++;
              return (
                <div className="order___block_item" key={`${itemIdx}_${typeIdx}`}>
                  <div>{count}.</div>
                  <div>
                    <span>
                      {item[1].name}, {typeObj.size} см, {typeObj.type} тесто
                    </span>
                    <span>
                      {typeObj.price.toFixed(2)} р. * {typeObj.amount} шт.
                    </span>
                  </div>
                </div>
              );
            }),
          )
          .flat()}
      </div>
      <div className="order___block">
        <span>Форма оплаты: {payment_type}</span>
        {/* <span>Колличество товарных позиций: 10 шт.</span> */}
        <span>Итого: {total_price.toFixed(2)} р.</span>
      </div>
      {btnName ? (
        <Button onClick={onChangeStatus}>{btnName}</Button>
      ) : (
        <span className="print__order no-print" onClick={handlePrint}>
          Печать
        </span>
      )}
      {btnNameReturn ? (
        <Button outline onClick={onReturnStatus}>
          {btnNameReturn}
        </Button>
      ) : null}
    </div>
  );
}

export default OrderItem;
