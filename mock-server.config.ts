const DB = [{ id: 0, title: "test", status: "pending" }];

/** @type {import('mock-config-server').MockServerConfig} */
const mockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/todos",
        method: "get",
        routes: [{ data: DB }],
      },
      {
        path: "/todos/:id",
        method: "get",
        interceptors: {
          response: (_, { request }) => {
            const todo = DB.find((todo) => todo.id === +request.params.id);

            if (!todo) {
              return null;
            }

            return todo;
          },
        },

        routes: [{ data: "OK" }],
      },
      {
        path: "/todos",
        method: "post",
        interceptors: {
          response: (_, { request }) => {
            const { body } = request;
            const todo = {
              id: Math.random(),
              title: body.title,
              status: "pending",
            };
            DB.push(todo);

            return { todo, message: "Задача создана" };
          },
        },
        routes: [{ data: "OK" }],
      },
      {
        path: "/todos/:id",
        method: "delete",
        interceptors: {
          response: (_, params) => {
            const todo = DB.find(
              (todo) => todo.id === +params.request.params.id
            )!;

            const index = DB.indexOf(todo);
            if (index > -1) {
              DB.splice(index, 1);
            }

            return {
              message: "Задача удалена",
            };
          },
        },

        routes: [{ data: "OK" }],
      },
      {
        path: "/todos/:id",
        method: "put",
        interceptors: {
          response: (_, params) => {
            const { title, status } = params.request.body;
            console.log(status);
            const index = DB.findIndex(
              (todo) => +todo.id === +params.request.params.id
            );
            if (index !== -1) {
              DB[index].title = title;
              DB[index].status = status;
            }

            return {
              message: "Задача изменена",
            };
          },
        },
        routes: [{ data: "OK" }],
      },
    ],
  },
};

export default mockServerConfig;
