class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.head >= this.items.length) {
      return undefined;
    }

    const item = this.items[this.head];
    this.head += 1;

    if (this.head > 50 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }

    return item;
  }

  get size(): number {
    return this.items.length - this.head;
  }
}

const queue = new Queue<string>();
queue.enqueue('first');
queue.enqueue('second');

console.log(queue.dequeue());
console.log(queue.size);

