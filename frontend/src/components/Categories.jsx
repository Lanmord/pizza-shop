import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions/filters.js';

function Categories({ items, activeCategory }) {
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {items.map((item, index) => (
          <li
            key={`${item}_${index}`}
            onClick={() => dispatch(setCategory(index))}
            className={activeCategory === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Categories);
