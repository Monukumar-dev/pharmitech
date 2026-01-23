// utils/getAuthHeaders.js
import { getOrCreateGuestToken } from "@/utlis/guestToken";

export const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user-info")); 
  const authToken = user?.token; 

  if (authToken) {
    return {
      Authorization: `Bearer ${authToken}`,
    };
  } else {
    const guestToken = getOrCreateGuestToken();
    return {
      "X-Guest-ID": guestToken,
    };
  }
};
