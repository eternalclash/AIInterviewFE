// state/messages.js
import { atom, RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const messageState = atom({
  key: "messageState", // 고유한 key
  default: {
    question: "",
    answer: "",
  },
});
