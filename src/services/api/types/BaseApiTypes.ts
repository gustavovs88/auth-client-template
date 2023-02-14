export interface IApiBaseError {
  error: {
    code: number;
    message: {
      value: string;
      formatted: string;
    };
  };
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
}
