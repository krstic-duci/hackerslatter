import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ErrorBoundary from "common/ErrorBoundary";
import Header from "common/Header";
import NewsList from "components/news";

const App = () => {
  return (
    <>
      <Container fluid className="bg-orange">
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
      </Container>

      <Container className="negative-mt">
        <Row>
          <Col>
            <ErrorBoundary>
              <NewsList />
            </ErrorBoundary>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
