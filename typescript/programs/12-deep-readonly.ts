type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

type Config = {
  api: {
    baseUrl: string;
    retryCount: number;
  };
};

const config: DeepReadonly<Config> = {
  api: {
    baseUrl: 'https://api.example.com',
    retryCount: 3,
  },
};

console.log(config);

