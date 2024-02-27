import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../requests/getTodo";

export const useGetTodosQuery = (
  queryKey?: string,
  settings?: QuerySettings<typeof getTodo>
) =>
  useQuery({
    queryKey: ["getTodos", queryKey],
    queryFn: () =>
      getTodo({ ...(settings?.config && { config: settings.config }) }),
    ...settings?.options,
  });
