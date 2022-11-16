import {Link} from "react-router-dom";
import {PAGE_LINKS} from "../../Common";

import "bootstrap/dist/css/bootstrap.min.css";

function SeaBattleApp() {
    return (
        <div className="container text-center mt-3">
            <h1 className="text-warning">Sea Battle game in progress.</h1>
            <Link to={PAGE_LINKS.sudoku} className="text-success fs-4">Try Sudoku game</Link>
        </div>
    );
}

export default SeaBattleApp;