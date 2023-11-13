import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
      test: "hello world",
    };
  },

  //actions
  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();

      alert(
        `${authUserStore.username} just bought ${
          this.count
        } items at a total of $${this.calculateTotal()}`
      );
    },
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

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },

  //getters
  getters: {
    count: (state) => state.items.length,

    isEmpty(state) {
      return state.count === 0;
    },

    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);

      const sorted = Object.keys(grouped).sort();

      let inOrder = {};

      sorted.forEach((key) => {
        inOrder[key] = grouped[key];
      });

      return inOrder;
    },

    groupCount: (state) => (name) => state.grouped[name].length,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
