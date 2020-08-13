import React from 'react'
import propTypes from 'prop-types';


/*React.memo нужен для оптимизации делает поверхностное сравнение пропсов и смотрит изменилась ли ссылка например на
* items, если не изменилась то ререндера не будет, изменилась - будет */

const Categories = React.memo(
    ({activeCategory, items, onClickCategory}) => {

      return (
          <div className="categories">
            <ul>

              <li onClick={() => onClickCategory(null)} // если не выбрано ничего, то активно 'ВСЕ' благодаря null
                  className={activeCategory === null ? 'active' : ''}>Все
              </li>

              {items && items.map((item, index) =>        // items && проверка если items хранит положительные значения, то выполняется правая часть, если отрицательные, то не выполняется
                  <li onClick={() => onClickCategory(index)}
                      className={activeCategory === index ? 'active' : ''}
                      key={`${item}_${index}`}>{item}
                  </li>)}

            </ul>
          </div>
      );
    }
);

Categories.propTypes = {
  // activeCategory: propTypes.oneOf([propTypes.number, null]),
  items: propTypes.arrayOf(propTypes.string).isRequired,
  onClickCategory: propTypes.func
};

// значения пропсов по умолчанию, если какой-то из них не будет передан во избежании краша приложения
Categories.defaultProps = {
  activeCategory: null,
  items: []
};

export default Categories;

