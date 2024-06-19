// state/sidebarState.js
import { atom } from "recoil";

export const playListState = atom({
  key: "playListState",
  default: [],
});
