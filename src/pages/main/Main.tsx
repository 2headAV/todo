import { Button, Input, ModeToggle, TodoCard } from "@/components";
import { useTodo } from "./hooks/useTodo";

export const Main = () => {
  const {
    data,
    state,
    form,
    function: { onSubmit },
  } = useTodo();

  return (
    <>
      <div className="p-4">
        <ModeToggle />
      </div>
      {state.loading ? (
        <div className="flex h-screen justify-center items-center text-2xl">
          Загрузка...
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-10 text-[50px]">TODO LIST</div>
          <form className="flex justify-center" onSubmit={onSubmit}>
            <div className="flex gap-4 w-1/3">
              <Input
                placeholder="Поставить задачу"
                {...form.register("title")}
              />
              <Input className="hidden" {...form.register("id")} />
              <Button className="h-[50px]" type="submit">
                Добавить задачу
              </Button>
            </div>
          </form>
          <div className="flex flex-wrap gap-5 justify-center mt-4">
            {data?.map((todo) => (
              <TodoCard key={todo.id} {...todo} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
