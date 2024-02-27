import { $api } from "../..";

export interface DeleteTodoParams {
  id: number;
}

export const deleteTodo = ({
  params,
  config,
}: RequestConfig<DeleteTodoParams>) =>
  $api.delete(`todos/${params.id}`, config);
