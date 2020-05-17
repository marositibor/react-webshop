const initialState = {
        items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD_CARTITEM": {
            const {
                sku
            } = action.payload;
            const findProductIndex = state.items.findIndex(item => item.sku === sku)
            if(findProductIndex === -1){
                return {
                    ...state,
                        items: [...state.items, {sku,pieces: 1}],
                }
            }
            const newState = {...state}
            newState.items[findProductIndex].pieces +=1
            return{...newState}
        }
        case "REMOVE_CARTITEM":{
            const {
                sku
            } = action.payload;
            const findProductIndex = state.items.findIndex(item => item.sku === sku)
            if(state.items[findProductIndex].pieces -1 === 0){
                return{...state,
                items: state.items.filter((item,index)=>index!==findProductIndex)}
            }
            const newState = {...state}
            newState.items[findProductIndex].pieces -=1
            return{...newState}

        }
        case "EMPTY_CART":{
            return {...initialState}

        }
        default:
            return state;
    }
}