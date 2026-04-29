export function HydrationMismatch() {
  return <p>{new Date().toISOString()}</p>;
}

export function HydrationSafe({createdAt}: {createdAt: string}) {
  return <p>{createdAt}</p>;
}

