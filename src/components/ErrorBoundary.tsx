/* eslint-disable @typescript-eslint/no-useless-constructor */

import type { ErrorInfo, ReactNode } from 'react';
import { Component, memo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebAccessibilityErrorBoundary', error, errorInfo);
  }

  override render() {
    const { children } = this.props;
    return children;
  }
}

export default memo(ErrorBoundary);
