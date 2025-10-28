import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // keyed by product id: { id, title, price, qty, thumbnail }
  totalQuantity: 0,
  totalAmount: 0,
};

const recalcTotals = (state) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  Object.values(state.items).forEach(item => {
    totalQuantity += item.qty;
    totalAmount += item.qty * item.price;
  });
  state.totalQuantity = totalQuantity;
  state.totalAmount = totalAmount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const p = action.payload; // expect { id, title, price, thumbnail }
      const existing = state.items[p.id];
      if (existing) {
        existing.qty += 1;
      } else {
        state.items[p.id] = { ...p, qty: 1 };
      }
      recalcTotals(state);
    },
    removeProduct: (state, action) => {
      const id = String(action.payload);
      delete state.items[id];
      recalcTotals(state);
    },
    incrementQty: (state, action) => {
      const id = String(action.payload);
      if (state.items[id]) {
        state.items[id].qty += 1;
      }
      recalcTotals(state);
    },
    decrementQty: (state, action) => {
      const id = String(action.payload);
      if (state.items[id] && state.items[id].qty > 1) {
        state.items[id].qty -= 1;
      }
      recalcTotals(state);
    },
    clearCart: (state) => {
      state.items = {};
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addProduct, removeProduct, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
