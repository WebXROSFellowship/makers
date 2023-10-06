import { AppConfig } from "./AppConfig";

export const HttpRequest = () => {
  const baseUrl = AppConfig.SITE_URL;
  const timeout = 10000; // Set a timeout for HTTP requests (e.g., 10 seconds)
  const headers = {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };

  const makeRequest = async (endpoint, method, payload) => {
    console.log(
      `http request data \n endpoint: ${endpoint} \n method: ${method} \n payload: ${payload}`
    );
    const url = `${baseUrl}${endpoint}`;
    const options = {
      method, // GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        ...headers,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };

    if (method !== "GET") {
      options.body = JSON.stringify(payload); // body data type must match "Content-Type" header
    }
    console.log("options Data", options);

    try {
      return await fetch(url, options)
        .then((response) => {
          console.log("Getting API RESPONSE....", response);
          if (response?.ok) {
            return response.json();
          } else {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((result) => {
          console.log("Getting API RESULT....", result);
          return result;
        })
        .catch((error) => {
          console.error("Error While Getting API RESPONSE & RESULT...", error);
          throw new Error(
            `HTTP Error While Getting API RESPONSE & RESULT... ${error}`
          );
        })
        .finally((result) => {
          console.log("Final http result", result);
          return result;
        });
    } catch (error) {
      console.log("Exception occured while making a http request.!", error);
      return error;
    }
  };

  const httpGet = async (endpoint) => {
    return makeRequest(endpoint, "GET", null);
  };
  const httpPost = async (endpoint, payload) => {
    return makeRequest(endpoint, "POST", payload);
  };
  const httpPut = async (endpoint, payload) => {
    return makeRequest(endpoint, "PUT", payload);
  };
  const httpDelete = async (endpoint) => {
    return makeRequest(endpoint, "DELETE", null);
  };

  return {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
};
