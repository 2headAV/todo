import { useMutation } from "@tanstack/react-query";
import { PostTodoParams, postTodo } from "../requests/postTodo";

export const usePostCreateTodoMutation = (
  settings?: MutationSettings<PostTodoParams, typeof postTodo>
) =>
  useMutation({
    mutationKey: ["createTodo"],
    mutationFn: (params: PostTodoParams) =>
      postTodo({
        params,
        ...(settings?.config && { config: settings.config }),
      }),
    ...settings?.options,
  });
