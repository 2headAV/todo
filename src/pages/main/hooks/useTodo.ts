import {
  useDeleteTodoMutation,
  usePostCreateTodoMutation,
} from "@/utils/api/hooks";
import { useGetTodosQuery } from "@/utils/api/hooks/useGetTodosQuery";
import { usePutTodoMutation } from "@/utils/api/hooks/usePutTodoMutation";
import { useForm } from "react-hook-form";

interface todoForm {
  id: number | null;
  title: string;
}

export const useTodo = () => {
  const getTodosQuery = useGetTodosQuery();
  const postTodoMutation = usePostCreateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();
  const putTodoMutation = usePutTodoMutation();

  const todoForm = useForm<todoForm>();

  const onSubmit = todoForm.handleSubmit(async (values) => {
    if (values.id) {
      await putTodoMutation.mutateAsync({ id: values.id, title: values.title });
    } else {
      await postTodoMutation.mutateAsync(values);
      todoForm.reset();
    }
    getTodosQuery.refetch();
  });

  const onDelete = async (id: number) => {
    await deleteTodoMutation.mutateAsync({ id });
    getTodosQuery.refetch();
  };

  const onChangeStatus = async (
    id: number,
    title: string,
    status: "pending" | "success"
  ) => {
    await putTodoMutation.mutateAsync({
      id,
      title,
      status: status === "pending" ? "success" : "pending",
    });
    getTodosQuery.refetch();
  };

  return {
    state: {
      loading: getTodosQuery.isLoading,
      loadingPut: putTodoMutation.isPending,
    },
    data: getTodosQuery.data && getTodosQuery.data.data,
    function: { onSubmit, onDelete, onChangeStatus },
    form: todoForm,
  };
};
