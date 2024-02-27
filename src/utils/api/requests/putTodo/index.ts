import { $api } from "../..";

export interface putTodoParams {
  id: number;
  title: string;
  status?: "pending" | "success";
}

export const putTodo = ({ params, config }: RequestConfig<putTodoParams>) =>
  $api.put(`todos/${params.id}`, params, config);
