type DeepPartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type Config = {
  api: {
    baseUrl: string;
    retry: {
      count: number;
      delayMs: number;
    };
  };
};

const configPatch: DeepPartial<Config> = {
  api: {
    retry: {
      count: 3,
    },
  },
};

console.log(configPatch);

