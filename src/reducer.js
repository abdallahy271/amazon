export const initialState = {
    basket: [],
    user: null
};

//selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item)=> item.price + amount, 0)

//action is "what are you trying to do?"
//Do you wanna add to the basket or remove
const reducer = ( state, action ) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket]

            if (index >= 0){
                newBasket.splice(index, 1)

            } else {
                console.warn(
                    `We can't remove product (id: ${action.id} because it is not in the basket`
                )
            }
            return {
                ...state,
                basket: newBasket
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }

}

export default reducer;