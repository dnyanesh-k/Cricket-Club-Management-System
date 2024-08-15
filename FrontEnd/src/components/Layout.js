// src/components/Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown ,NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Layout({ children, onLogout }) {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon="#" /> Cricket Club
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
              <Nav.Link as={Link} to="/players">Players</Nav.Link>
              <Nav.Link as={Link} to="/matches">Matches</Nav.Link>
            {user && user.role === 'ADMIN' && (
    <NavDropdown title="Admin Dashboard" id="admin-dashboard-dropdown">
    <NavDropdown.Item as={Link} to="/admin/teams">Manage Teams</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/admin/players">Manage Players</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/admin/matches">Manage Matches</NavDropdown.Item>
  </NavDropdown>
  )}
            </Nav>
            <Nav>
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} /> {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Button variant="outline-light" className="me-2" onClick={handleLoginClick}>Login</Button>
                  <Button variant="warning" onClick={() => navigate('/register')}>Register</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 mt-4">
        {children}
      </Container>

      <footer className="text-center text-lg-start mt-auto">
        <Container className="p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Cricket Club</h5>
              <p>
                Dedicated to promoting cricket and nurturing talent in our community.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled mb-0">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Follow Us</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Cricket Club Management System
        </div>
      </footer>
    </div>
  );
}

export default Layout;