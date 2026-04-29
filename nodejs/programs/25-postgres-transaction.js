export async function createOrder(pool, {userId, items}) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      'INSERT INTO orders(user_id) VALUES($1) RETURNING id',
      [userId],
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        'INSERT INTO order_items(order_id, product_id, quantity) VALUES($1, $2, $3)',
        [orderId, item.productId, item.quantity],
      );
    }

    await client.query('COMMIT');
    return {id: orderId};
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

