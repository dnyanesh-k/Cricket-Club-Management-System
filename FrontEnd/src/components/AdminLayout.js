// src/components/AdminLayout.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AdminLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" href="/admin/teams" className="me-2">
            Manage Teams
          </Button>
        </Col>
        <Col>
          <Button variant="primary" href="/admin/players" className="me-2">
            Manage Players
          </Button>
        </Col>
        <Col>
          <Button variant="primary" href="/admin/matches" className="me-2">
            Manage Matches
          </Button>
        </Col>
      </Row>
      {children}
    </Container>
  );
};

export default AdminLayout;
