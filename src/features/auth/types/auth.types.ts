export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IChangePasswordFormData {
  current_password: string;
  new_password: string;
  re_new_password: string;
}

export interface IDeleteAccountFormData {
  current_password: string;
}

export interface IResetPasswordFormData {
  new_password: string;
  re_new_password: string;
}

export interface IUserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}
