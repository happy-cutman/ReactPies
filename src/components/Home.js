import React, {useCallback, useEffect} from 'react'
import {Categories, SortPopup, PiesBlock, PiePreloader} from './index';
import {useSelector, useDispatch} from 'react-redux';
import {setCategory, setSortBy} from './../redux/filters_reducer'
import {fetchPies} from '../redux/pies_reducer';
import {addPieToCart} from '../redux/cart_reducer';

// для избежание лишнего ререндера массивы вынесены за пределы функции
const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'}
];

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.pies.items); // получает массив из редакс
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector((state) => state.pies.isLoaded); // получает boolean
    const {category, sortBy} = useSelector((state) => state.filters); // получение sortBY из редакса и передача в пропсы

    useEffect(() => {
        dispatch(fetchPies(category, sortBy))
    }, [category, sortBy]);

    /* useCallback позволяет сохранить одну и ту же ссылку на функцию и избежать доп рендера
    * работает по принципу useEffect только возвращает ф-ю которую указали первым параметром */
    const onSelectCategory = useCallback((index) => { // отправляет данные в редакс setCategory это AC
        dispatch(setCategory(index))
    }, []);

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type))
    }, []);

    const handleAddPieToCart = (obj) => {
        dispatch(addPieToCart(obj))
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames}/>
                <SortPopup items={sortItems} activeSortType={sortBy.type} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пироги</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map(obj =>
                        <PiesBlock
                            onClickAddPizza={handleAddPieToCart}
                            cartAddedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            key={obj.id}
                            {...obj}/>)
                    : Array(12).fill(0).map((_, index) => <PiePreloader key={index}/>)} {/* ...obj означает, что все св-ва объекта будут проброшены в компонент */}
                {/* при рендере Home создаётся массив из 10 элементов и в каждый элемент помещается <PiePreloader/>.
                fill(0).map((_, index)) для того чтобы указать уникальный ключ*/}
            </div>
        </div>
    );
};

export default Home;

