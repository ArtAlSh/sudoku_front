import React from "react";
import {back_req, BACK_REQ_LINKS, PAGE_LINKS} from "../../Common";
import {Navigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            pass_type: "password",
            pass_btn: "show",
        }
        this.username = "";
        this.password = "";
    }

    handleClickSubmitBtn() {
        if (this.username && this.password) {
            let data = {"username": this.username, "password": this.password};
            back_req.post(BACK_REQ_LINKS.log_in, data)
                .then( rez => this.props.auth(rez.data) )
                .catch( () => this.setState({error: " is-invalid"}) );
        }
    }

    handleClickPassBtn() {
        if (this.state.pass_type === "password") {
            this.setState({
                pass_type: "text",
                pass_btn: "hide",
            })
        } else {
            this.setState({
                pass_type: "password",
                pass_btn: "show",
            })
        }
    }

    render() {
        if (this.props.user) return <Navigate to={PAGE_LINKS.home}/>;

        return (
            <div className="container bg-light p-4 mt-3 rounded-3">

                <h1 className="text-center">LogIn</h1>

                <form>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="username" className="form-label col-2">Username </label>
                        <div className="col-8">
                            <input type="text" id="username"
                                   className={"form-control" + this.state.error}
                                   onChange={ event => this.username = event.target.value } />
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="password" className="form-label col-2">Password </label>
                        <div className="col-8">
                            <div className="input-group">
                                <input type={ this.state.pass_type } id="password"
                                       className={"form-control" + this.state.error}
                                       onChange={ event => this.password = event.target.value }/>
                                <button className="btn btn-info" type="button"
                                        onClick={ () => this.handleClickPassBtn() }
                                > { this.state.pass_btn } </button>
                                <div className="invalid-feedback">Wrong credentials.</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-lg mt-3"
                                onClick={ () => this.handleClickSubmitBtn() }
                        >LogIn</button>
                    </div>

                </form>

            </div>
        );
    }
}


class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user_err: "",
            pass_err: "",
            pass1_type: "password",
            pass1_btn: "show",
            pass2_type: "password",
            pass2_btn: "show",
        }
        this.username = "";
        this.email = "";
        this.password1 = "";
        this.password2 = "";

    }

    handleClickPassBtn(pass_num) {
        let pass_type = "pass" + pass_num + "_type";
        let pass_btn = "pass" + pass_num + "_btn";
        let state = {};
        if (this.state[pass_type] === "password") {
            state[pass_type] = "text";
            state[pass_btn] = "hide";
        } else {
            state[pass_type] = "password";
            state[pass_btn] = "show";
        }
        this.setState(state);
    }

    handleClickSubmitBtn() {
        if ((this.password1 !== this.password2) || !this.password1 || this.password1.length < 4) {
            this.setState({pass_err: " is-invalid "});
        } else {
            let data = {
                "username": this.username,
                "email": this.email,
                "password": this.password1,
            };
            back_req.post(BACK_REQ_LINKS.sign_up, data)
                .then(rez => this.props.auth(rez.data))
                .catch( () => this.setState({user_err: " is-invalid "}) );
        }
    }

    handleChangeUsername(event) {
        this.username = event.target.value;
    }

    handleChangePass(event, pass_num) {
        let password = "password" + pass_num;
        this[password] = event.target.value;
    }

    render() {
        if (this.props.user) return <Navigate to={PAGE_LINKS.home}/>;

        return (
            <div className="container bg-light p-4 mt-3 rounded-3">

                <h1 className="text-center">SignUp</h1>

                <form>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="username" className="form-label col-2">Username </label>
                        <div className="col-8">
                            <input type="text" id="username"
                                   className={"form-control" + this.state.user_err}
                                   onChange={ event => this.handleChangeUsername(event) } />
                            <div className="invalid-feedback">This username already exist.</div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="email" className="form-label col-2">Email </label>
                        <div className="col-8">
                            <input type="email" className="form-control" id="email"
                                   onChange={ event => {this.email = event.target.value} } />
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="password1" className="form-label col-2">Password </label>
                        <div className="col-8">
                            <div className="input-group">
                                <input type={ this.state.pass1_type } id="password1"
                                       className={ "form-control" + this.state.pass_err }
                                       onChange={ event => this.handleChangePass(event, 1) } />
                                <button className="btn btn-info" type="button"
                                        onClick={ () => this.handleClickPassBtn(1) }
                                >{ this.state.pass1_btn } </button>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        <label htmlFor="password2" className="form-label col-2">Confirm password </label>
                        <div className="col-8">
                            <div className="input-group">
                                <input type={ this.state.pass2_type } id="password2"
                                       className={ "form-control" + this.state.pass_err }
                                       onChange={ event => this.handleChangePass(event, 2) } />
                                <button className="btn btn-info" type="button"
                                        onClick={ () => this.handleClickPassBtn(2) }
                                >{ this.state.pass2_btn } </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-lg mt-3"
                                onClick={ () => this.handleClickSubmitBtn() }
                        >SignUp</button>
                    </div>

                </form>

            </div>
        );
    }
}


export {LogIn, SignUp};
