// state/messages.js
import { atom, RecoilEnv } from "recoil";


export const audioState = atom({
  key: "audioState", // 고유한 key
  default: [],
});
