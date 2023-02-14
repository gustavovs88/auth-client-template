import fetchClient from "@utils/fetchClient/fetch";
import { IApiBaseError } from "../types/BaseApiTypes";

export interface IUpdatePasswordResponse {}

class CustomerApi {
  async updatePassword(
    newPassword: string,
    token: string | null
  ): Promise<IUpdatePasswordResponse | IApiBaseError> {
    return fetchClient.put("/api/v1/customer/password", {
      password: newPassword,
      resetPasswordToken: token,
    });
  }
}

export default new CustomerApi();
