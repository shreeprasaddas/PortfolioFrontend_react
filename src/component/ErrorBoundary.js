import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.icon}>⚠️</div>
            <h1 style={styles.title}>Something went wrong</h1>
            <p style={styles.message}>
              An unexpected error occurred. Please try refreshing the page or go back to the home page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre style={styles.detail}>
                {this.state.error.toString()}
              </pre>
            )}
            <button style={styles.btn} onClick={this.handleReset}>
              ← Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '3rem 2.5rem',
    textAlign: 'center',
    maxWidth: '480px',
    width: '100%',
    color: '#fff',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#fff',
  },
  message: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  detail: {
    background: 'rgba(255,0,0,0.1)',
    border: '1px solid rgba(255,0,0,0.25)',
    borderRadius: '8px',
    padding: '1rem',
    fontSize: '0.78rem',
    color: '#ff8080',
    textAlign: 'left',
    overflowX: 'auto',
    marginBottom: '1.5rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  btn: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
};

export default ErrorBoundary;
