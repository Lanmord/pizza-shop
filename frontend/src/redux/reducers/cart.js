import produce from 'immer';

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

function cart(state = initialState, action) {
  switch (action.type) {
    // переписать на immer
    case 'ADD_PIZZA_CART': {
      let newTypeArr = null;

      if (state.items[action.value._id]) {
        let newTypeIndex = state.items[action.value._id].pizzasType.findIndex(
          (item) => item.type === action.value.type && item.size === action.value.size,
        );

        newTypeArr = [...state.items[action.value._id].pizzasType];

        if (newTypeIndex < 0) {
          newTypeArr.push({
            type: action.value.type,
            size: action.value.size,
            totalPrice: action.value.price,
            price: action.value.price,
            amount: 1,
          });
        } else {
          newTypeArr[newTypeIndex].amount++;
          newTypeArr[newTypeIndex].totalPrice = Number(
            (action.value.price * newTypeArr[newTypeIndex].amount).toFixed(2),
          );
        }
      }

      const newItems = {
        ...state.items,
        [action.value._id]: !state.items[action.value._id] ? {
          name: action.value.name,
          imageUrl: action.value.imageUrl,
          amount: 1,
          pizzasType: [{
            type: action.value.type,
            size: action.value.size,
            totalPrice: action.value.price,
            price: action.value.price,
            amount: 1,
          }, ],
        } : {
          ...state.items[action.value._id],
          amount: state.items[action.value._id].amount + 1,
          pizzasType: newTypeArr,
        },
      };

      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + 1,
        totalPrice: Number((state.totalPrice + action.value.price).toFixed(2)),
      };
    }

    case 'CLEAR_CART':
      return {
        totalPrice: 0, totalCount: 0, items: {}
      };

    case 'REMOVE_CART_ITEM': {
      return produce(state, (draft) => {
        draft.items[action.value.pizzaId].amount -=
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].amount;

        const lastTypePrice =
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].totalPrice;
        const lastTypeAmount =
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].amount;

        draft.items[action.value.pizzaId].pizzasType.splice(action.value.typeIndex, 1);
        // console.log(newItems[action.value.pizzaId].pizzasType[action.value.typeIndex].amount);

        if (draft.items[action.value.pizzaId].pizzasType.length === 0) {
          delete draft.items[action.value.pizzaId];
        }

        draft.totalPrice = Number((draft.totalPrice - lastTypePrice).toFixed(2));
        draft.totalCount = draft.totalCount - lastTypeAmount;
      });
    }

    case 'MINUS_CART_ITEM': {
      return produce(state, (draft) => {
        const price = draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].price;

        if (draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].amount - 1 === 0) {
          draft.items[action.value.pizzaId].amount--;
          draft.items[action.value.pizzaId].pizzasType.splice(action.value.typeIndex, 1);

          if (draft.items[action.value.pizzaId].pizzasType.length === 0) {
            delete draft.items[action.value.pizzaId];
          }
        } else {
          draft.items[action.value.pizzaId].amount--;
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].amount--;
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].totalPrice -=
            draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].price;
        }

        draft.totalPrice = Number((draft.totalPrice - price).toFixed(2));
        draft.totalCount--;
      });
    }

    case 'PLUS_CART_ITEM': {
      return produce(state, (draft) => {
        draft.items[action.value.pizzaId].amount++;
        draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].amount++;
        draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].totalPrice +=
          draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].price;

        draft.totalPrice = Number(
          (
            draft.totalPrice +
            draft.items[action.value.pizzaId].pizzasType[action.value.typeIndex].price
          ).toFixed(2),
        );
        draft.totalCount++;
      });
    }

    default:
      return state;
  }
}

export default cart;