import fetchClient from "@utils/fetchClient/fetch";
import { IApiBaseError, ICustomer } from "@services/api/types/BaseApiTypes";

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IloginParams {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
  customer: ICustomer;
}

export interface IRequestResetPasswordParams {
  email: string;
}

class AuthApi {
  async login(
    loginParams: IloginParams
  ): Promise<ILoginResponse | IApiBaseError> {
    return fetchClient.post("/api/v1/auth/login", loginParams);
  }

  async logout(): Promise<{} | IApiBaseError> {
    return fetchClient.post("/api/v1/auth/logout", {});
  }

  async refreshToken(): Promise<IRefreshTokenResponse | IApiBaseError> {
    return fetchClient.post("/api/v1/auth/refresh", {});
  }

  async requestResetPassword(
    params: IRequestResetPasswordParams
  ): Promise<{} | IApiBaseError> {
    return fetchClient.post("/api/v1/auth/resetPassword", params);
  }
}

export default new AuthApi();
