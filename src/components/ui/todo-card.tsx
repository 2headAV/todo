import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
} from "..";
import { Loader, Menu } from "lucide-react";
import { useTodo } from "@/pages/main/hooks/useTodo";

interface TodoCardProps {
  id: number;
  title: string;
  status: "pending" | "success";
}

export const TodoCard = ({ id, title, status }: TodoCardProps) => {
  const {
    function: { onDelete, onSubmit, onChangeStatus },
    form,
    state,
  } = useTodo();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div
              onClick={() => onChangeStatus(id, title, status)}
              className="flex items-center space-x-2"
            >
              {state.loadingPut ? (
                <Loader size={16} />
              ) : (
                <Checkbox
                  // defaultChecked={}
                  checked={status === "pending" ? false : true}
                  id={title}
                />
              )}
              <Label
                htmlFor={title}
                className={status === "success" ? "line-through" : ""}
              >
                {title}
              </Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Изменить
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="mt-5">
                      <form onSubmit={onSubmit}>
                        <Input
                          defaultValue={title}
                          placeholder="Изменить задачу"
                          {...form.register("title")}
                        />
                        <Input
                          className="hidden"
                          value={id}
                          {...form.register("id")}
                        />
                        <DialogClose className="mt-4" type="submit">
                          <Button type="submit">Изменить</Button>
                        </DialogClose>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem
                  className="text-red-500 "
                  onClick={() => onDelete(id)}
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};
