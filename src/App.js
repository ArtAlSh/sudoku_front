import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import NavBar from "./components/base/NavBar";
import HomePage from "./components/base/HomePage";
import StatisticPage from "./components/base/StatisticPage";
import SudokuApp from "./components/sudoku/SudokuApp";
import TicTacToeApp from "./components/ticTacToe/TicTacToeApp";
import {LogIn, SignUp} from "./components/auth/AuthPages";

import SeaBattleApp from "./components/ seaBattle/SeaBattleApp";
import "./App.css"

import {PAGE_LINKS, AUTH_LINKS, back_req} from "./Common";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        let token = localStorage.getItem("Authorization");
        if (token && username) {
            back_req.defaults.headers.common["Authorization"] = token;
            this.setState({username: username});
        }
    }

    back_request() {
        return back_req;
    }

    authenticate(data) {
        let token = "Token " + data.token;
        back_req.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("Authorization", token);
        localStorage.setItem("username", data.username);
        this.setState({username: data.username});
    }

    logOut() {
        delete back_req.defaults.headers.common["Authorization"];
        localStorage.removeItem("Authorization");
        localStorage.removeItem("username");
        this.setState({username: null});
    }



  render() {
    return(
        <div>

            <NavBar user={ this.state.username } logout={ () => this.logOut() } />

            <Routes>
                <Route path={PAGE_LINKS.home} element={<HomePage/>} />
                <Route path={PAGE_LINKS.statistic}
                       element={<StatisticPage
                           user={this.state.username}
                           back={ () => this.back_request() }
                       />}
                />
                <Route path={PAGE_LINKS.sudoku} element={<SudokuApp user={this.state.username} />} />
                <Route path={PAGE_LINKS.tic_tac_toe} element={<TicTacToeApp/>} />
                <Route path={PAGE_LINKS.sea_battle} element={<SeaBattleApp/>} />
                <Route path={AUTH_LINKS.log_in}
                       element={<LogIn
                           auth={ data => this.authenticate(data) }
                           user={ this.state.username }
                       />}
                />
                <Route path={AUTH_LINKS.sign_up}
                       element={<SignUp
                           auth={ data => this.authenticate(data) }
                           user={ this.state.username }
                       />}
                />
            </Routes>

        </div>
    );
  }
}


export default App;
