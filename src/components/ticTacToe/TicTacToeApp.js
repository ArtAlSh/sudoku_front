import {Link} from "react-router-dom";
import {back_req, TIC_TAC_TOE_LINKS, PAGE_LINKS} from "../../Common";
import "./TicTacToeApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import data from "bootstrap/js/src/dom/data";

const COUNTER = 15;


function Square(props) {
    return (
        <td className="text-center fs-1 cell_tictactoe"
            onClick={ () => props.handleClick() }
        >{ props.value }</td>
    );
}


class TicTacToeApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            started: false,
            counter: COUNTER,
            values: {"1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": ""},
            your_turn: false,
            winner: null,
        };
        this.counter = this.counter.bind(this);
        window.setInterval(this.counter, 1000);
    }

    componentDidMount() {
        this.newGame();
    }

    counter() {
        if (this.state.counter && !this.state.winner) {
            let counter = this.state.counter - 1;
            console.log(this.state.counter);
            this.setState({counter: counter});
            this.updateGame();
        } else {
            let msg = this.state.started ? "Time is over." : "Can't find an opponent :("
            this.setState({winner: msg});
        }
    }

    updateGame() {
        if ((!this.state.your_turn && !this.state.winner) || !this.state.started) {
            back_req.get(TIC_TAC_TOE_LINKS.base)
            .then( rez => {
                    this.setState({
                        started: rez.data.started,
                        values: rez.data.play_square,
                        your_turn: rez.data.your_turn,
                        winner: rez.data.winner,
                        counter: (rez.data.your_turn && rez.data.started ? COUNTER : this.state.counter),
                    });
            }
            ).catch( () => this.setState({winner: "Your opponent stopped the game."}) );
        }
    }

    newGame() {
        // delete old game if exist
        back_req.delete(TIC_TAC_TOE_LINKS.base);
        // create new game
        back_req.post(TIC_TAC_TOE_LINKS.base)
            .then( rez => {
                this.setState({
                    started: rez.data.started,
                    values: rez.data.play_square,
                    your_turn: rez.data.your_turn,
                    winner: rez.data.winner,
                    counter: COUNTER,
                });
            });
    }

    setValue(cellNum) {
        if (!this.state.values[cellNum]) {
            let data = {"cell": cellNum}
            back_req.put(TIC_TAC_TOE_LINKS.base, data)
                .then( rez => this.setState({
                    started: rez.data.started,
                    values: rez.data.play_square,
                    your_turn: rez.data.your_turn,
                    winner: rez.data.winner,
                    counter: COUNTER,
                })).catch();
        }
    }

    handleClick(cellNum) {
        if (this.state.your_turn) {
            console.log("set value in " + cellNum + " cell");
            this.setValue(cellNum);
        } else {
            console.log("wait your queue.");
        }
    }

    renderSquare(cellNum) {
        const values = this.state.values;
        return (
            <Square
                value={values[cellNum]}
                handleClick = { () => this.handleClick(cellNum) }
            />
        );
    }

    renderBoard() {
        let board = [];

        for (let i=0; i<3; ++i) {
            let row = [];
            for (let j=0; j<3; ++j) {
                let cellNum = i * 3 + j + 1;
                row.push(this.renderSquare(cellNum));
            }
            board.push(<tr>{row}</tr>);
        }

        return <tbody>{board}</tbody>;
    }

    renderWaitingPlayer() {
        if (!this.state.started && !this.state.counter) {
            return this.renderNewGameMsg("Try again?");
        }
        return (
            <h2 className="container text-center mt-5">
                <span className="spinner-border text-primary" role="status" /> Waiting for a second player.
            </h2>
        );
    }

    renderNewGameMsg(msg_text=null) {
        return (
            <div className="container mt-3">
                <h2 className="text-center">{ this.state.winner }</h2>
                <h3 className="text-center">{ msg_text ? msg_text : "Stat new game?" }</h3>
                <div className="d-grid gap-2 d-flex justify-content-center">
                    <button type="button" className="btn btn-success btn-lg m-2"
                            onClick={ () => this.newGame() }
                    >Yes</button>
                    <Link to={PAGE_LINKS.home} className="btn btn-primary btn-lg m-2">No</Link>
                </div>
            </div>
        );
    }

    render(){
        if (!this.state.started) return this.renderWaitingPlayer();
        if (this.state.winner) return this.renderNewGameMsg();
        return (
            <div className="container">
                <header className="text-center fs-3 mt-4">
                    { this.state.your_turn ? "Your turn. " : "Waiting for opponent. " }
                    Wait <span className="text-danger">{ this.state.counter }</span> sec.
                </header>
                <main>
                    <table className="table-bordered mt-2 board_tictactoe">
                        { this.renderBoard() }
                    </table>
                </main>
            </div>
        );
    }

}


// function TicTacToeApp() {
//     return(
//         <div className="container text-center mt-3">
//             <h1 className="text-warning">TicTacToe game in progress.</h1>
//
//             <Link to={PAGE_LINKS.sudoku} className="text-success fs-4">Try Sudoku game</Link>
//         </div>
//     );
// }

export default TicTacToeApp;