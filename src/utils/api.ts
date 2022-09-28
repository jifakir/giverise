import axios, { AxiosRequestConfig } from "axios";
import cookie from "js-cookie";

export const getToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenParam = urlParams.get("token");
  console.log("NODE_ENV::", process.env.NEXT_PUBLIC_NODE_ENV);
  return (
    tokenParam ||
    cookie.get(`${process.env.NEXT_PUBLIC_NODE_ENV}_token`) ||
    cookie.get(`token`)
  );
};

async function api<T = any, U = Meta>(
  url: string,
  method: AxiosRequestConfig["method"] | AxiosRequestConfig["data"] = "get",
  payload?:
    | AxiosRequestConfig["data"]
    | Omit<AxiosRequestConfig, "url" | "method" | "data">,
  axiosRequestConfig?: Omit<AxiosRequestConfig, "url" | "method" | "data">
): Promise<ApiResponse<T, U>> {
  if (typeof method == "object") {
    payload = { ...method };
    method = "post";
  }
  const token: string | undefined = getToken();
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    url = "/api" + url;
    const { data } = await axios({
      url,
      method,
      data: payload,
      ...axiosRequestConfig,
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
    });
    return data;
  } catch (error: any) {
    // use the server error response if available
    if (error.response) {
      const serverMessage: string = error.response?.data?.meta?.error?.message;
      const authUrls: string[] = [];
      if (
        !authUrls.includes(url) &&
        error.response.status === 401 &&
        typeof window !== "undefined"
      ) {
        window.localStorage.setItem("logout", Date.now().toString());
        // window.location.assign(
        //   `${process.env.NEXT_PUBLIC_APP_AUTH_SERVICE_URL}?redirectUrl=${window.location.href}`
        // );
      }

      throw new Error(serverMessage);
    }
    // throw errors that happen in the browser as is
    throw new Error(error.message);
  }
}

type ApiResponse<T, U> = {
  data?: T;
  meta: U;
};

type Meta =
  | {
      status_code: number;
      success: boolean;
    }
  | {
      error: {
        code: number;
        message: string;
        statusCode: number;
      };
    };

export default api;
