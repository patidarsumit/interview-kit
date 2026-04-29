type Brand<T, TBrand extends string> = T & { readonly __brand: TBrand };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function createUserId(value: string): UserId {
  return value as UserId;
}

function createOrderId(value: string): OrderId {
  return value as OrderId;
}

function findUser(id: UserId): UserId {
  return id;
}

const userId = createUserId('u1');
const orderId = createOrderId('o1');

console.log(findUser(userId));
console.log(orderId);

