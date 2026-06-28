import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  failed: boolean;
}

/**
 * Catches render / lazy-chunk-load errors in a subtree so a non-critical
 * failure (e.g. a flaky network dropping the 3D globe chunk) degrades
 * gracefully to `fallback` instead of white-screening the whole page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    // Subtree is non-critical — swallow and render the fallback.
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
