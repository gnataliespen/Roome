import cookie from "js-cookie";
export const handleLogin = token => {
  cookie.set("token", token);
};
