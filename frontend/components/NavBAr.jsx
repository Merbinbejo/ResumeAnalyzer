import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Component({ data, setData }) {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" style={{ background: "transparent" }}>
      <Container
        fluid
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          borderRadius: "10px",
          width: "100%",
          backdropFilter: "blur(10px)",
          marginTop: "10px",
        }}
      >
        <Navbar.Brand>Resume Analyzer</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* User Info */}
            {data && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {data.username?.charAt(0).toUpperCase()}
                </div>

                <span>{data.username.toUpperCase()}</span>

                <Button
                  variant="danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setData(null);
                    navigate("/login");
                    Swal.fire({
                      title: "Logged Out!",
                      icon: "success",
                      draggable: true,
                    });
                  }}
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Show only if NOT logged in */}
            {!data && (
              <>
                <Nav.Link as={NavLink} to="/signin">
                  <Button variant="success">Register</Button>
                </Nav.Link>

                <Nav.Link as={NavLink} to="/login">
                  <Button variant="primary">Login</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Component;
