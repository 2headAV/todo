interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    "queryKey"
  >;
}

type ApiRequestConfig = Omit<import("axios").AxiosRequestConfig, "headers"> & {
  headers?: PlainObject;
};

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };
