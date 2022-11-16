import React from "react";
import {back_req, BACK_REQ_LINKS, PAGE_LINKS} from "../../Common";

import "bootstrap/dist/css/bootstrap.min.css";
import {Navigate} from "react-router-dom";

class StatisticPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sudoku: null,
        };
    }

    componentDidMount() {
        this.getStatistic()
    }

    getStatistic() {
        if (this.props.user) {
            back_req.post(BACK_REQ_LINKS.statistic)
                .then( rez => this.setState({sudoku: rez.data.sudoku}) );
        }
    }

    render() {
        if (!this.props.user) return <Navigate to={PAGE_LINKS.home}/>;
        if (!this.state.sudoku) return 0;

        return (
            <div className="container">
                <h3 className="text-center mt-3">{ this.props.user }</h3>
                <p className="text-center">Your statistic:</p>
                <p className="text-center"><b>Sudoku:</b> you played in {this.state.sudoku["games_count"]} games and winn in {this.state.sudoku["winn_count"]}.</p>
            </div>
        );
    }
}

export default StatisticPage;
