type UserDto = {
  id: string;
  name: string;
  email?: string;
};

function isUserDto(value: unknown): value is UserDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (candidate.email === undefined || typeof candidate.email === 'string')
  );
}

const data: unknown = {
  id: 'u1',
  name: 'Sumit',
};

if (isUserDto(data)) {
  console.log(data.name);
}

