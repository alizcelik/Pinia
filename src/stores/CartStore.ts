import { defineStore } from "pinia";
import { groupBy } from "lodash";

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
    calculateTotal() {
      let total = 0;
      this.items.forEach((item) => {
        total += item.price;
      });
      return total;
    },
    clearItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },
  },

  //getters
  getters: {
    count: (state) => state.items.length,

    isEmpty(state) {
      return state.const === 0;
    },

    grouped: (state) => groupBy(state.items, (item) => item.name),

    groupCount: (state) => (name) => state.grouped[name].length,
  },
});
