import './SudokuApp.css';
import axios from "axios";
import Board from "./SudokuBoard";
import KeyBoardEvent from "./KeyBoardEvent"

import {SUDOKU_LINKS, back_req} from "../../Common";

// const PATH_BASE = "http://127.0.0.1:8000/";
// const PATH_BASE = "https://square-games.herokuapp.com/";

class SudokuApp extends Board {

  constructor(props) {
    super(props);
    this.state = {
      level: null,
      statistic: false,
      playSquare: null,
      fullSquare: null,
    };
    this.newGame = this.newGame.bind(this);
    this.initNewGame = this.initNewGame.bind(this);
    this.getSudoku = this.getSudoku.bind(this);
    document.addEventListener("keyup",
            event => KeyBoardEvent(event, this.state.activeCell, this.handleClick, this.setValue)
    );
  }

  componentDidMount() {
    const game = JSON.parse(localStorage.getItem("game"));
    if (game && game.hasOwnProperty("playSquare")) {
      this.setState(game);
      this.initSavedGame();
    }
    else {
      this.newGame("easy");
    }
  }

  newGame(level="easy") {
    localStorage.setItem("saved_data", JSON.stringify({}));
    this.setState({victory: false});
    this.getSudoku(level);
  }

  initNewGame(sudoku_square) {
    let game = {
      level: sudoku_square.level,
      statistic: sudoku_square.statistic,
      playSquare: sudoku_square.play_square,
      fullSquare: sudoku_square.full_square,
    };
    localStorage.setItem("game", JSON.stringify(game));
    this.setState(game);
    this.init(game.playSquare);
  }

  getSudoku(level) {
    const url = SUDOKU_LINKS.base + level + "/" ;
    back_req.get(url)
        .then(res => this.initNewGame(res.data))
        .catch(err => console.log(err));
  }

}

export default SudokuApp;
