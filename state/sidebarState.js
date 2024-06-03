// state/sidebarState.js
import { atom } from "recoil";
import {
  LIST_LIST,
  PLAY_LIST,
  PRESET_LIST,
  SIDE_TYPE,
} from "@/utils/constants";

export const sidebarState = atom({
  key: "sidebarState",
  default: {
    clicked: SIDE_TYPE.PRESET,
    list: PRESET_LIST,
  },
});
