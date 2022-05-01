import { Tag, UserResult } from "@/models";
import axios, { AxiosResponse } from "axios";
import { injectable } from "tsyringe";

@injectable()
export default class ApiService {
  baseUrl = "https://avl-frontend-exam.herokuapp.com/api";

  public async getTags(): Promise<Tag[]> {
    const res: AxiosResponse = await axios(`${this.baseUrl}/tags`);
    return res.data;
  }

  public async getResults(
    currentPage: number,
    pageSize: number,
    keyword = "",
    type = "all" // all or friends,
  ): Promise<UserResult> {
    let url = `${this.baseUrl}/users/${type}?page=${currentPage}&pageSize=${pageSize}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    const res: AxiosResponse = await axios(url);
    return res.data;
  }
}
