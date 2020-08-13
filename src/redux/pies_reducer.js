import axios from 'axios';

const initialState = {
    items: [],
    isLoaded: false
};

//Reducer
const pies = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PIES':
            return {...state, items: action.payload, isLoaded: true};
        case 'SET_LOADED':
            return {...state, isLoaded: action.payload};
        default:
            return state
    }
};

// Actions
export const setLoaded = (value) => ({
    type: 'SET_LOADED',
    payload: value
});

export const setPies = (items) => ({
    type: 'SET_PIES',
    payload: items
});

// Thunk
export const fetchPies = (category, sortBy) => (dispatch) => {
    dispatch(setLoaded(false)); // до того как выполнится запрос
    axios.get(`https://my-json-server.typicode.com/happy-cutman/fake_json/pies?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`) // получение
        .then(({data}) => dispatch(setPies(data))) // сохранение после получения
};


export default pies;
