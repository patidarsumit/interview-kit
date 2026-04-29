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

function assertUserDto(value: unknown): asserts value is UserDto {
  if (!isUserDto(value)) {
    throw new Error('Invalid user');
  }
}

const payload: unknown = JSON.parse('{"id":"u1","name":"Sumit"}');

assertUserDto(payload);
console.log(payload.id);

