import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode,
};

interface ErrorBoundaryState {
    hasError: boolean,
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
        return (
          <div>Oops, something went wrong</div>
        );
    }

    return children;
  }
}

export default ErrorBoundary;
