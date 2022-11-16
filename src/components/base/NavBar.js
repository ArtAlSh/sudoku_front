import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {PAGE_LINKS, AUTH_LINKS} from "../../Common";


class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    renderUserStateLinks() {
        if (this.props.user) {
            return this.renderAuthLinks(this.props.user);
        } else {
            return this.renderNotAuthLinks();
        }
    }

    renderAuthLinks(username) {
        return (
            <div className="nav-item dropdown me-3">
                <a className="nav-link dropdown-toggle text-white"
                   role="button" data-bs-toggle="dropdown" aria-expanded="false"
                >
                    { username }
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    {/*<li><a className="dropdown-item" href="#">Statistic</a></li>*/}
                    <li><Link to={PAGE_LINKS.statistic} className="dropdown-item">Statistic</Link></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" onClick={this.props.logout}>Log Out</a></li>
                </ul>
            </div>
        );
    }

    renderNotAuthLinks() {
        return (
            <div className="nav">
                <Link to={AUTH_LINKS.log_in} className="nav-link text-primary" aria-current="page"
                >
                    Log In
                </Link>

                <span className="nav-link text-white">|</span>

                <Link to={AUTH_LINKS.sign_up} className="nav-link active text-danger" aria-current="page"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">

                    <Link to={PAGE_LINKS.home} className="navbar-brand ms-3">SquareGames</Link>

                    { this.renderUserStateLinks() }

                </div>
            </nav>
        );
    }
}

export default NavBar;