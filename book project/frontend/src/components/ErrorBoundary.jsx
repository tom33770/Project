import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fee2e2',
          border: '2px solid #dc2626',
          borderRadius: '8px',
          margin: '20px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h1 style={{ color: '#991b1b', marginBottom: '10px' }}>⚠️ Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', color: '#7f1d1d' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Click to see error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
