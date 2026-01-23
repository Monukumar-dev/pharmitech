import { userLogout } from "@/store/action/authActions";
import { resetLoginData } from "@/store/slices/authSlice";
import * as url from "@/utils/Url";
import { getLocalStorageItem } from "./localStorage";

export function isLoggedIn() {
  try {
    const userInfo = getLocalStorageItem("user-info", {});
    return !!(userInfo?.status && userInfo?.access_token);
  } catch {
    return false;
  }
}


export function LogoutUser(dispatch, routerPush) {
  dispatch(userLogout());
  dispatch(resetLoginData());
  routerPush(url.ROOT);
}