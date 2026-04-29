import React from 'react';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  State
> {
  state: State = {hasError: false};

  static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Something went wrong.</p>;
    }

    return this.props.children;
  }
}

