// state/sidebarState.js
import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: "로그인",
});
