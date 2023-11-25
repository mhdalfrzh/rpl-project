import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = ( state = { cartItems1: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems1.find((x) => x.product === item.product);
            if(existItem) {
                return { 
                    ...state,
                    error: '',
                    cartItems1: state.cartItems1.map((x) => x.product === existItem.product ? item : x),
                };
            } else {
                return { ...state, cartItems1: [...state.cartItems1, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                error: '',
                cartItems1: state.cartItems1.filter((x) => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress1: action.payload };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload};
        case CART_ADD_ITEM_FAIL:
            return { ...state, error: action.payload };
        case CART_EMPTY:
            return { ...state, error: '', cartItems1: []};
        default:
            return state;
    }
};