type Validator<T> = (value: unknown) => value is T;

type UserDto = {
  id: string;
  name: string;
};

function isUserDto(value: unknown): value is UserDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === 'string' && typeof candidate.name === 'string';
}

class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string, validate: Validator<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!validate(data)) {
      throw new Error('Invalid API response');
    }

    return data;
  }
}

const api = new ApiClient('https://example.com');

async function demo(): Promise<void> {
  const user = await api.get('/user/u1', isUserDto);
  console.log(user.name);
}

void demo();

