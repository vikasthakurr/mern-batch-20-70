import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    kitchenId: null,
    kitchenName: "",
  },
  reducers: {
    addToCart(state, action) {
      const { menuItem, name, price, kitchenId, kitchenName } = action.payload;

      if (state.kitchenId && state.kitchenId !== kitchenId) {
        state.items = [];
      }
      state.kitchenId = kitchenId;
      state.kitchenName = kitchenName;

      const existing = state.items.find((item) => item.menuItem === menuItem);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ menuItem, name, price, quantity: 1 });
      }
    },
  },
});
//remove
//update
//removeAll

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
