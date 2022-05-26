export interface IUrl {
  destiny: string;
  url: string;
}

export interface IResponseUrls {
  sucess: boolean;
  urls?: IUrl[];
}
