import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const isDevelopment = import.meta.env.DEV;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo: errorInfo
    });
    
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-900">
          <div className="max-w-md mx-auto p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-red-500/30 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-400" size={48} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
            
            {isDevelopment && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-red-400 font-medium mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-black/40 p-4 rounded-lg text-xs text-gray-300 font-mono overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
