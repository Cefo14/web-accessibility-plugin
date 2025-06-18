/* eslint-disable @typescript-eslint/no-useless-constructor */

import type { ErrorInfo, ReactNode } from 'react';
import { Component, memo } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebAccessibilityErrorBoundary', error, errorInfo);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default memo(ErrorBoundary);
