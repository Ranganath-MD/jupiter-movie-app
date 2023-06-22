import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MDBNavbar dark fixed expand="md">
      <MDBContainer fluid className="p-4">
        <MDBNavbarToggler
          type="button"
          onClick={() => setShowNavNoToggler(!showNavNoToggler)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavNoToggler}>
          <MDBNavbarBrand href="#" className="brand_name" onClick={() => navigate("/")}>
            Jupiter
          </MDBNavbarBrand>
          <MDBNavbarNav className="mr-auto mb-lg-0">
            <MDBNavbarItem>
              <Link
                to="/discover/movies"
                className={location.pathname.includes("movies") ? "active" : "links"}
                aria-current="page"
                >
                Movies
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link
                to="/discover/tv-shows"
                className={location.pathname.includes("tv-shows") ? "active" : "links"}
              >
                TV Shows
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav className="d-flex w-auto mb-3">
            <MDBNavbarItem>
              <a
                href="https://github.com/Ranganath-MD/Jupiter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MDBIcon fab size="md" icon="github" className="github" />
              </a>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
