// state/sidebarState.js
import { atom } from "recoil";

export const saveState = atom({
  key: "saveState",
  default: [],
});
