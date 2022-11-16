import React from "react";
import "./SudokuApp.css";

function InfoMenu( {level, handleClick} ) {

        return (
            <div className="row">
                <div className="btn-group offset-sm-1 offset-md-2 offset-lg-9 col-3 my-2">
                    <a type="button" className="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                    >Level:  { level }
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <button className="dropdown-item" type="button"
                                    onClick={ () => { handleClick("easy") } }
                            >Easy</button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button"
                                    onClick={ () => { handleClick("medium") } }
                            >Medium</button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button"
                                    onClick={ () => { handleClick("hard") } }
                            >Hard</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
}

export default InfoMenu;
