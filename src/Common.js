import axios from "axios";


const HOME_LINK = "/";
// const BACK_URL = "http://127.0.0.1:8000/";
// const BACK_URL = "http://localhost:8000/";
const BACK_URL = "https://games-production-7379.up.railway.app/";

const back_req = axios.create({
    "withCredentials": true,
    "baseURL": BACK_URL,
});

const BACK_REQ_LINKS = {
    "sign_up": "sign_up/",
    "log_in": "log_in/",
    "statistic": "statistic/",
};

const SUDOKU_LINKS = {
    "base": "sudoku/",
    "easy": "sudoku/easy/",
    "medium": "sudoku/medium/",
    "hard": "sudoku/hard/",
};

const TIC_TAC_TOE_LINKS = {
    "base": "tic-tac-toe/",
}

const PAGE_LINKS = {
    "home": HOME_LINK,
    "statistic": HOME_LINK + "statistic/",
    "sudoku": HOME_LINK + "sudoku/",
    "tic_tac_toe": HOME_LINK + "tic-tac-toe/",
    "sea_battle": HOME_LINK + "sea_battle/",
};

const AUTH_LINKS = {
    "log_in": HOME_LINK + "log_in/",
    "sign_up": HOME_LINK + "sign_up/",
};

export {PAGE_LINKS, AUTH_LINKS, SUDOKU_LINKS, TIC_TAC_TOE_LINKS, BACK_REQ_LINKS, back_req};
