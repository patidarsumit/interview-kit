type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseJson(value: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error('Invalid JSON'),
    };
  }
}

const parsed = parseJson('{"name":"Sumit"}');

if (parsed.ok) {
  console.log(parsed.value);
} else {
  console.error(parsed.error.message);
}

