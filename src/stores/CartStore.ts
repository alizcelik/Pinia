import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },

  //actions
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },

  //getters
  getters: {
    count: (state) => state.items.length,

    isEmpty(state) {
      return state.const === 0;
    },
  },
});
