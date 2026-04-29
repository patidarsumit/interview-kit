function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

type PaymentStatus = 'pending' | 'paid' | 'failed';

function getPaymentLabel(status: PaymentStatus): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'paid':
      return 'Paid';
    case 'failed':
      return 'Failed';
    default:
      return assertNever(status);
  }
}

console.log(getPaymentLabel('paid'));

