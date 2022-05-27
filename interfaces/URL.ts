export interface IUrl {
  destiny: string;
  url: string;
  authorId?: string;
}

export interface IResponseUrls {
  sucess: boolean;
  urls?: IUrl[];
}
