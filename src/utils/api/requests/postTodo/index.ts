import { $api } from "../..";

export interface PostTodoParams {
  title: string;
}

export const postTodo = ({ params, config }: RequestConfig<PostTodoParams>) =>
  $api.post("todos", params, config);
