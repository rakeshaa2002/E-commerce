
import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import ThemeContext from "./ThemeContext";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar variant="dark" expand="lg" collapseOnSelect className="navbar fixed-top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-play-circle text-primary me-2"></i>
              <span className="fw-bold">WatchKart</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <SearchBox />

            <Nav
              className="ms-auto my-2 my-lg-0 align-items-center"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/history">
                <Nav.Link>
                  <i className="fas fa-history"></i> Order History
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/track">
                <Nav.Link>
                  <i className="fas fa-truck"></i> Track Order
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/history">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/track">
                    <NavDropdown.Item>Track Order</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* Theme Toggle */}
              <div
                className="theme-toggle"
                onClick={toggleTheme}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <i className={isDarkMode ? "fas fa-sun text-warning" : "fas fa-moon text-dark"}></i>
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
