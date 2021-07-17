import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzaToCart as addPizzaToCartAction } from '../../redux/actions/cart.js';
// import PropTypes from 'prop-types';

function PizzaBlock({ _id, name, imageUrl, types, sizes, price }) {
  const availableTypes = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];

  const dispatch = useDispatch();
  const pizzaAmount = useSelector(({ cart }) => cart.items[_id] && cart.items[_id].amount);

  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(
    availableSizes.findIndex((item) => item === sizes[0]),
  );
  const [priceRatio] = React.useState(price / availableSizes[activeSize]);
  const [actualPrice, setActualPrice] = React.useState(price);
  let typeStyle = { transform: 'translateX(' + activeType * 100 + '%)' };
  let sizeStyle = { transform: 'translateX(' + activeSize * 100 + '%)' };

  const onSelectType = (index) => {
    setActiveType(index);
  };
  const onSelectSize = (index) => {
    setActiveSize(index);
    // setActualPrice(Number(Math.floor(priceRatio * availableSizes[index]) + '.9'));
    setActualPrice(priceRatio * availableSizes[index]);
    // setActualPrice(Number(Math.floor((availableSizes[index] / 2) * price) + '.9'));
  };
  const addPizzaToCart = () => {
    dispatch(
      addPizzaToCartAction({
        _id,
        name,
        imageUrl,
        price: actualPrice,
        size: availableSizes[activeSize],
        type: availableTypes[activeType],
      }),
    );
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <div className="pizza-block__info">
        <h4 className="pizza-block__title">{name}</h4>

        <div className="pizza-block__selector">
          <ul>
            <div id="second" style={sizeStyle} className="toggle-button-selctor"></div>
            {availableSizes.map((item, index) => (
              <li
                key={item}
                onClick={() => onSelectSize(index)}
                className={classNames({
                  active: activeSize === index,
                  disabled: !sizes.includes(item),
                })}>
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__selector">
          <ul>
            <div style={typeStyle} className="toggle-button-selctor"></div>
            {availableTypes.map((item, index) => (
              <li
                key={item}
                onClick={() => onSelectType(index)}
                className={classNames({
                  active: activeType === index,
                  disabled: !types.includes(index),
                })}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{actualPrice.toFixed(2)} р.</div>
          <Button onClick={addPizzaToCart} className="button--add" outline>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {pizzaAmount && <i>{pizzaAmount}</i>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
