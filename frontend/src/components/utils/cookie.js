export const AUTH_TOKEN = "___auth___token";

export function setCookie(key, value, day = 1) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + day * 1000 * 60 * 60 * 24);
  const expires = "; expires=" + expiry.toGMTString();
  document.cookie = key + "=" + JSON.stringify(value) + expires + "; path=/;";
}

export function getCookie(key) {
  const result = document.cookie.match(new RegExp(key + "=([^;]+)"));
  return (result && JSON.parse(result[1])) || "";
}

export function deleteCookie(key) {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const expires = ";expires=" + d;
  document.cookie = key + "=;" + expires + "; path=/;";
}
