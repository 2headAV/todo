import { useMutation } from "@tanstack/react-query";
import { putTodo, putTodoParams } from "..";

export const usePutTodoMutation = (
  settings?: MutationSettings<putTodoParams, typeof putTodo>
) =>
  useMutation({
    mutationKey: ["putTodo"],
    mutationFn: (params: putTodoParams) =>
      putTodo({ params, ...(settings?.config && { config: settings.config }) }),
    ...settings?.options,
  });
