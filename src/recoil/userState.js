import { atom } from "recoil";

export const isAuthState = atom({
  key: "isAuth",
  default: false,
});

export const userState = atom({
  key: "userData",
  default: {},
});

export const tokenState = atom({
  key: "token",
  default: null,
});
