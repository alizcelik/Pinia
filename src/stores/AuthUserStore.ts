import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
  state: () => {
    return {
      //username: "alio",
    };
  },

  //getters
  getters: {
    username: () => "alio",
  },
});
