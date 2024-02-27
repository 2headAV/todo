import { useMutation } from "@tanstack/react-query";
import { DeleteTodoParams, deleteTodo } from "..";

export const useDeleteTodoMutation = (
  settings?: MutationSettings<DeleteTodoParams, typeof deleteTodo>
) =>
  useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (params: DeleteTodoParams) =>
      deleteTodo({
        params,
        ...(settings?.config && { config: settings.config }),
      }),
  });
