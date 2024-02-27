import { $api } from "../../instance";

export const getTodo = (params?: RequestConfig) =>
  $api.get<Todo[]>("todos", params?.config);
