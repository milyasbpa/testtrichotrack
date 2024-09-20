export interface PostAccessTokenRequestInterface {
  username: string;
  password: string;
  client_secret: string;
}

export interface PostAccessTokenSuccessResponseInterface {
  access_token: string;
  token_type: string;
}

export interface PostAccessTokenErrorResponseInterface {
  detail: string;
}
