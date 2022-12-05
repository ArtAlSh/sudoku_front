
import React from "react";
import Keyboard from "./Keyboard";
import InfoMenu from "./InfoMenu";
import Conflicts from "./CheckValues";
import {back_req, SUDOKU_LINKS} from "../../Common";
import "./SudokuApp.css";
import data from "bootstrap/js/src/dom/data";


function Square(props) {
    let cellStyle = "text-center cell" + props.style;
    return (
        <td className={ cellStyle }
            onClick={ () => props.handleClick() }
        >{ props.value }</td>
    );
}


class BaseBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            victory: false,
            activeCell: null,
            values: Array(81).fill({
                value: " ",
                changeable: true,
                conflict: false,
            }),
        };
        this.init = this.init.bind(this);
        this.initSavedGame = this.initSavedGame.bind(this);
        this.setValue = this.setValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    init(sudokuSquare) {
        let new_vals = Array(81).fill({
                value: " ",
                changeable: true,
                conflict: false,
        });

        let num = 0;
        for (let i=0; i<sudokuSquare.length; ++i) {
            for (let j = 0; j < sudokuSquare[i].length; ++j) {
                if (sudokuSquare[i][j]) {
                    new_vals[num] = {
                        value: sudokuSquare[i][j],
                        changeable: false,
                        conflict: false,
                    };
                }
                ++num;
            }
        }
        localStorage.setItem("saved_data", JSON.stringify({values: new_vals}));
        this.setState({values: new_vals,});
    }

    initSavedGame() {
        const saved_data = JSON.parse(localStorage.getItem("saved_data"));
        this.setState({values: saved_data.values});
    }

    setValue(value) {
        let cell = this.state.values[this.state.activeCell]
        if (cell.changeable) {
            let activeCell = this.state.activeCell;
            let new_values = [...this.state.values];
            let newValCell = {...new_values[activeCell]};
            newValCell.value = value;
            new_values[activeCell] = newValCell;

            new_values = Conflicts(new_values);
            this.checkVictory(new_values);

            localStorage.setItem("saved_data", JSON.stringify({values: new_values}));
            this.setState({values: new_values});
        }
    }

    handleClick(cellNum) {
        this.setState({activeCell: cellNum});
    }

    checkVictory(values) {
        for (let i=0; i<values.length; ++i) {
            let value = values[i];
            if (value.value === " " || value.conflict) {
                return false;
            }
        }
        // Send statistic
        if (this.props.user) {
            let data = {
                "is_winn": true,
                "add_new": !this.props.statistic,
            };
            back_req.put(SUDOKU_LINKS.base, data);
        }
        localStorage.setItem("saved_data", JSON.stringify({}));
        localStorage.setItem("game", JSON.stringify({}));
        this.setState({ victory: true });
        return true;
    }

}


class Board extends BaseBoard {

    getStyle(cellNum) {
        let style = "";
        style += this.getTextStyle(cellNum);
        style += this.getActivityStyle(cellNum);
        style += this.getBorderStyle(cellNum);
        return style;
    }

    getActivityStyle(cellNum) {
        let activeCell = this.state.activeCell

        if (activeCell === null) return "";

        if (cellNum === activeCell) {
                return  " activeCell";
            } else if (cellNum % 9 === activeCell % 9) {
                return  " activeCells";
            } else if (
                activeCell - (activeCell % 9) <= cellNum
                 &&
                activeCell + 9 - (activeCell % 9) > cellNum
            ) {
                return  " activeCells";
        }

        return "";
    }

    getTextStyle(cellNum) {
        let style = "";
        let cell = this.state.values[cellNum];
        let activeCellVal = this.state.activeCell || this.state.activeCell === 0
            ? this.state.values[this.state.activeCell].value
            : null;

        if (cell.changeable) {
            style += " text-secondary";
        } else {
            style += " text-dark";
        }

        if (cell.value === activeCellVal) {
            style += " fw-bold";
        }

        if (cell.conflict) {
            style += " text-danger";
        }
        return style;
    }

    getBorderStyle(cellNum) {
        let style = "";

        let verBoard = (cellNum + 1) % 3;
        if ( !verBoard ) {
            style += " border-right-bold";
        } else {
            style += " border-right-thin";
        }

        let horBord = ((cellNum - cellNum % 9) + 9) % 27 ;
        if ( !horBord ) {
            style += " border-bottom-bold";
        } else {
            style += " border-bottom-thin";
        }

        return style;
    }

    renderSquare(cellNum) {
        const values = this.state.values;
        return (
            <Square
                value={values[cellNum].value}
                handleClick = { () => this.handleClick(cellNum) }
                style = { this.getStyle(cellNum) }
            />
        );
    }

    renderBoard() {
        let board = [];

        for (let i=0; i<9; ++i) {
            let row = [];
            for (let j=0; j<9; ++j) {
                let cellNum = i*9+j;
                row.push(this.renderSquare(cellNum));
            }
            board.push(<tr>{row}</tr>);
        }

        return <tbody>{board}</tbody>;
    }

    renderVictoryMessage() {
        return (
            <div className="container">
                <div className="text-center fs-1 mt-5">You are win!!!</div>

                <div className="text-center fs-4">
                    <div className="btn-group">
                        <a type="button" className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                        >Start new game?</a>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className="dropdown-item fs-5" type="button"
                                        onClick={ () => this.newGame("easy") }
                                >Easy level</button>
                            </li>
                            <li>
                                <button className="dropdown-item fs-5" type="button"
                                        onClick={ () => { this.newGame("medium") } }
                                >Medium level</button>
                            </li>
                            <li>
                                <button className="dropdown-item fs-5" type="button"
                                        onClick={ () => { this.newGame("hard") } }
                                >Hard level</button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }

    render() {
        if (!this.state.playSquare) return null;
        if (this.state.victory) return this.renderVictoryMessage();

        return (
            <div className="container">

                <div className="row row-cols-sm-1 row-cols-lg-2 align-items-center">

                    <div className="col p-4">
                        <InfoMenu level={this.state.level} handleClick={ (level) => this.newGame(level) } />
                        <table className="table-borderless square mt-4 mb-2 fs-4 m-sm-auto me-lg-0">
                            {this.renderBoard()}
                        </table>
                    </div>

                    <div className="col">
                        <Keyboard setValue={ (val) => this.setValue(val) } />
                    </div>

                </div>
            </div>
        );
    }
}


export default Board;
