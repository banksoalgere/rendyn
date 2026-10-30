'use client';

import { Component, type ReactNode } from 'react';

export class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <div role="alert" data-preview-error="true">Preview unavailable. <button onClick={() => this.setState({ failed: false })}>Retry preview</button></div>
      : this.props.children;
  }
}
