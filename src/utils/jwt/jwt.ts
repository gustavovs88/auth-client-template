export default function decodeJWTToken<T>(token: string | null): T | null {
  try {
    if (token) {
      const data = JSON.parse(window.atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return currentTime > data.exp ? null : data;
    }
    return null;
  } catch (err) {
    return null;
  }
}
