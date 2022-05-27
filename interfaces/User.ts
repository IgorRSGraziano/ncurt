import { IUrl } from "./URL";
export interface IUser {
  isLogged: boolean;
  id?: string;
  name?: string;
  email?: string;
  urls?: IUrl[];
}
