import React, { Component, ErrorInfo, ReactNode } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In here we could load an error to Sentry or similar
    // analytics
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Row>
            <Col>
              <div className="text-center mt-5">
                <h2 data-testid="errorHeading">We are sorry...</h2>
                <p>
                  Something unexpected happen, and it's on us. We are working
                  hard to restore it...
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
