Exacution Order

1. Call Stack (Sync)
2. Microtask Queue
   - Promise.then
   - Promise.catch
   - Promise.finally
   - async/await continuation
   - Promise.all().then
3. Macrotask Queue
   - setTimeout
   - setInterval
   - DOM events


Golden Rule

Run all Sync code
↓
Run ALL Microtasks
↓
Run ONE Macrotask
↓
Run ALL new Microtasks
↓
Run next Macrotask