# 09. Refs And DOM Access

Refs are React's escape hatch.

A ref stores a mutable value that survives re-renders but does not cause a re-render when it changes.

## Basic useRef

```tsx
const countRef = useRef(0);

countRef.current += 1;
```

Changing `countRef.current` does not re-render the component.

Use state when the UI should update.

Use refs when you need to store something mutable outside the render output.

## DOM Access

The most common use of refs is accessing DOM elements.

```tsx
import {useRef} from 'react';

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} type="search" />
      <button type="button" onClick={focusInput}>
        Focus search
      </button>
    </>
  );
}
```

Use DOM refs for:

- focusing an input
- measuring element size
- scrolling to an element
- integrating third-party DOM libraries
- managing media elements

## Ref vs State

State:

- triggers re-render
- used for UI values
- should be updated immutably

Ref:

- does not trigger re-render
- stores mutable values
- useful for escape hatches

Example:

```tsx
function ClickTracker() {
  const clickCount = useRef(0);

  function handleClick() {
    clickCount.current += 1;
    console.log(clickCount.current);
  }

  return <button onClick={handleClick}>Track click</button>;
}
```

The button text does not update because ref changes do not render.

If you need the UI to show the count, use state.

## Store Timeout ID

```tsx
function SearchInput() {
  const timeoutId = useRef<number | null>(null);

  function handleChange(value: string) {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      console.log('Search', value);
    }, 300);
  }
}
```

Refs are useful for values that must persist between events but are not rendered.

## Latest Value Ref

Sometimes a callback needs the latest value without being recreated.

```tsx
function ChatLogger({roomId}: {roomId: string}) {
  const latestRoomId = useRef(roomId);
  latestRoomId.current = roomId;

  useEffect(() => {
    const id = setInterval(() => {
      console.log(latestRoomId.current);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return null;
}
```

Use this carefully. Often, the better solution is correct dependencies.

## forwardRef

Sometimes a parent needs a ref to a child component's DOM node.

```tsx
import {forwardRef} from 'react';

const TextInput = forwardRef<HTMLInputElement, {label: string}>(
  function TextInput({label}, ref) {
    return (
      <label>
        {label}
        <input ref={ref} />
      </label>
    );
  },
);
```

Now parent can do:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

<TextInput ref={inputRef} label="Email" />;
```

## useImperativeHandle

`useImperativeHandle` customizes what a parent receives from a ref.

Use it sparingly.

```tsx
type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle>(function Modal(_, ref) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return open ? <section role="dialog">Modal</section> : null;
});
```

This is useful for:

- modals
- editors
- media players
- focusable custom inputs

Senior warning:

Prefer declarative props first. Use imperative handles only when they make integration cleaner.

## Common Mistakes

- using refs instead of state for UI values
- reading/writing refs during render for changing data
- assuming ref changes re-render UI
- overusing imperative APIs
- forgetting that `ref.current` can be `null`

## Senior Best Practices

- use state for rendered values
- use refs for DOM access or mutable non-render values
- keep ref usage small and intentional
- use optional chaining for nullable DOM refs
- prefer declarative props over imperative handles
- isolate complex DOM integration in custom hooks

## Interview Questions

### What is a ref?

A mutable object whose `.current` value persists across renders.

### Does changing a ref cause re-render?

No. Ref changes do not trigger rendering.

### When would you use a ref?

For DOM access, timers, previous/latest values, and integration with imperative APIs.

### Ref vs state?

State affects rendering. Ref stores mutable values without rendering.

### What is `forwardRef`?

A way for a component to pass a received ref down to a child DOM element or component.

