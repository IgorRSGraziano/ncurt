export interface IUrl {
  destiny: string;
  url: string;
  authorId?: string;
  count?: number;
}

export interface IResponseUrls {
  sucess: boolean;
  urls?: IUrl[];
}
