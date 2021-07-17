import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../redux/actions/filters.js';

function SortPopup({ items, activeSortType }) {
  const [popupVisible, setVisiblePopup] = React.useState(false);

  const sortRef = React.useRef(null);
  const sortLabel = items.find((obj) => obj.type === activeSortType).name;
  const dispatch = useDispatch();

  const onSelectItem = (sortType) => {
    dispatch(setSortBy(sortType));
    setVisiblePopup(false);
  };

  const togglePopupVisible = () => {
    setVisiblePopup(!popupVisible);
  };

  const handleOutsideClick = (e) => {
    if (!e.path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <span>Сортировать по: </span>
      <div className="sort-items">
        {
          <ul>
            {items.map((obj, index) => (
              <li
                key={`${obj.type}_${index}`}
                onClick={() => onSelectItem(obj.type)}
                className={activeSortType === obj.type ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default React.memo(SortPopup);
