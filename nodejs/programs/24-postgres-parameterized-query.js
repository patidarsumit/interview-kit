export async function findUserByEmail(pool, email) {
  const result = await pool.query(
    'SELECT id, email, name FROM users WHERE email = $1',
    [email],
  );

  return result.rows[0] ?? null;
}

