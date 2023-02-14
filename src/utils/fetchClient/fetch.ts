const apiDomain = import.meta.env.API_DOMAIN;
class FetchClient {
  private domain: string;
  constructor(domain?: string) {
    if (domain) {
      this.domain = domain;
    } else {
      this.domain = "http://localhost:8000";
    }
  }
  async post(path = "", data = {}) {
    const response = await fetch(`${this.domain}${path}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken") || "",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async put(path = "", data = {}) {
    const response = await fetch(`${this.domain}${path}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken") || "",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}

export default new FetchClient(apiDomain);
