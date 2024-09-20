export interface PostCheckAPIKeyRequestInterface {
  client_secret: string;
}

export interface PostCheckAPIKeySuccessResponseInterface {
  expire_time: string;
}

export interface PostCheckAPIKeyErrorResponseInterface {
  detail: string;
}
