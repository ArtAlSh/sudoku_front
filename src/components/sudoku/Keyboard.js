import React from "react";
import "./SudokuApp.css";

class Key extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                type="button"
                onClick={ () => this.props.setValue() }
                className="btn btn-outline-secondary col col-sm-auto col-md-3 m-sm-auto m-lg-2"
            >{this.props.value}</button>
        );
    }
}

class Keyboard extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNumberKey(keyNum) {
        return (
            <Key
                value={keyNum}
                setValue={ () => this.props.setValue(keyNum)}
            />
        );
    }

    renderClearKey() {
        return (
            <Key
                value={"Clear"}
                setValue={ () => this.props.setValue(" ")}
            />
        );
    }

    renderKeyboard() {
        let keyboard = []
        for (let i = 0; i < 3; ++i) {
            let row = [];
            for (let j=0; j<3; ++j) {
                let keyNum = 3 * i + j + 1;
                row.push(this.renderNumberKey(keyNum));
            }
            keyboard.push(
                <div className="col">
                    <div className="row row-cols-3 justify-content-sm-around justify-content-md-center my-2">
                        { row }
                    </div>
                </div>
            );
        }
        keyboard.push(
            <div className="col text-sm-end text-md-center my-2">
                { this.renderClearKey() }
            </div>
        );
        return (
            <div className="row row-cols-sm-4 row-cols-md-1">
                { keyboard }
            </div>
        );

    }

    render() {
        return (
            <div className="container align-items-center square_width">
                {this.renderKeyboard()}
            </div>
        );
    }
}

export default Keyboard;
