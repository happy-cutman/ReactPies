import React, {useEffect, useRef, useState} from 'react'
import propTypes from 'prop-types';


const SortPopup = React.memo(({items, onClickSortType, activeSortType}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef(); // useRef хук создаёт объект со свойством current, позволяет сохранять ссылки на DOM элементы, функции, переменные и тд (всехда хранит актуальные значения)
    const activeLabel = items.find(obj => obj.type === activeSortType).name; // берёт каждый объект и сравнивает его тип с активным типом и если равен, то берёт у него имя

    const selectActiveItem = (type) => {
        onClickSortType(type);
        setVisiblePopup(false); // скрывает popup при выборе пункта
    };

    // переключает видимость popup,
    // по умолчанию он false, "!" смотрит что visiblePopup это отрицательное значение и возвращает true потому что false отрицательное*/}
    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup)
    };

    // определяет место клика и скрывает popup если клик вне области sort
    const handleOutsideClick = (event) => {

        const path = event.path || (event.composedPath && event.composedPath()); // отимизация под браузеры
        if (!path.includes(sortRef.current)) { // если клик был вне области блока sort (sortRef.current не содержит ссылку на sort)
            setVisiblePopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
    }, []); // [], значит, что при первом рендере выполняется эффект

    return (
        <div ref={ref => {sortRef.current = ref}} className="sort"> {/* записал ссылку на DOM элемент в sortRef */} {/* можно записать коротко ref={sortRef} */}
            <div className="sort__label">
                <svg className={visiblePopup ? 'rotated' : ''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span>
            </div>
            {visiblePopup && <div className="sort__popup"> {/*visiblePopup true то отображается div sort_popup*/}
                <ul>
                    {items &&
                        items.map((obj, index) => <li className={activeSortType === obj.type ? 'active' : ''}
                                                    onClick={() => selectActiveItem(obj)}
                                                    key={obj.type}>{obj.name}</li>)}
                </ul>
            </div>}
        </div>
    );
});

SortPopup.propTypes = {
    activeSortType: propTypes.string.isRequired,
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onClickSortType: propTypes.func.isRequired
};

SortPopup.defaultProps = {
    items: []
};

export default SortPopup;

