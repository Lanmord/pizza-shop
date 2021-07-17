import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { fetchPizzas } from '../redux/actions/pizzas.js';

const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые'];
const sortArray = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  return (
    <div className="container">
      <div className="separate_cont">
        <div className="content__top">
          <div>
            <input
              type="text"
              className="custom-input search"
              placeholder="Поиск"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Categories activeCategory={category} items={categoriesArray} />
          </div>
        </div>
        <div className="content_right">
          <div className="top-of-items">
            <h2 className="content__title">{categoriesArray[category]} пиццы</h2>
            <SortPopup activeSortType={sortBy} items={sortArray} />
          </div>
          <div className="content__items">
            {isLoaded
              ? items
                  .filter((val) => {
                    if (searchText == '') {
                      return val;
                    } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((obj) => <PizzaBlock key={`${obj._id}_${obj.name}`} {...obj} />)
              : Array(12)
                  .fill(0)
                  .map((_, index) => <PizzaLoadingBlock key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
