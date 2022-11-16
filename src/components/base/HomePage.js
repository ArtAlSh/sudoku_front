
import {Link} from "react-router-dom";
import {PAGE_LINKS} from "../../Common";

import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
    return(
        <div className="container">
            <h1 className="text-center mt-3">Choose your game:</h1>
            <div className="d-grid gap-2 col-8 mx-auto mt-3">
                <Link to={PAGE_LINKS.sudoku} className="btn btn-success fs-3">Sudoku</Link>
                <Link to={PAGE_LINKS.tic_tac_toe} className="btn btn-warning fs-3">Tic-tac-toe</Link>
                <Link to={PAGE_LINKS.sea_battle} className="btn btn-info fs-3">Sea battle</Link>
            </div>
        </div>
    );
}

export default HomePage;