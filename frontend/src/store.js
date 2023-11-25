import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
    orderCreateReducer, 
    orderDeleteReducer, 
    orderDeliverReducer, 
    orderDetailsReducer, 
    orderListReducer, 
    orderMineListReducer, 
    orderPayReducer
} from './reducers/orderReducers';
import { 
    productCategoryListReducer,
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer, 
    productListReducer, 
    productUpdateReducer
} from './reducers/productReducers';
import { 
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userRegisterReducer, 
    userSigninReducer, 
    userTopSellersListReducer, 
    userUpdateProfileReducer,
    userUpdateReducer
} from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo1: localStorage.getItem('userInfo1')
            ? JSON.parse(localStorage.getItem('userInfo1'))
            : null,
    },
    cart: {
        cartItems1: localStorage.getItem('cartItems1')
            ? JSON.parse(localStorage.getItem('cartItems1'))
            : [],
        shippingAddress1: localStorage.getItem('shippingAddress1')
            ? JSON.parse(localStorage.getItem('shippingAddress1'))
            : {},
        paymentMethod: 'transfer',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellersListReducer,
    productCategoryList: productCategoryListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( 
    reducer, 
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;