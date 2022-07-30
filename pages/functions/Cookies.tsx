import moment from "moment";
export function setCookie(
  cname: string,
  cvalue: string,
  duration: moment.Duration
) {
  if (typeof window !== "undefined") {
    const d = moment().add(duration);
    const expires = "expires=" + d.toDate().toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }
}

export function deleteCookie(cname: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export default function Cookies(cname: string) {
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
}
