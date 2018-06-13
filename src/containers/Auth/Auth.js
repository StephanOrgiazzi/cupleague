import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import FloatingLabel, {
    floatingStyles,
    focusStyles,
    inputStyles,
    labelStyles
} from 'floating-label-react';
import styles from './Auth.module.css';
import * as actionTypes from "../../store/actions/auth.js";
import { Redirect, withRouter } from 'react-router-dom';


class Auth extends Component {

    state = {
        email: '',
        password: '',
        isSignedUp: false
    }

    onChangeHandler = (event, input) => {
        switch (input) {
            case 'email':
                this.setState({
                    ...this.state,
                    email: event.target.value
                });
                break;
            case 'password':
                this.setState({
                    ...this.state,
                    password: event.target.value
                });
                break;
            default:
                return '';
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignedUp);
    }

    switchAuthModeHandler = () => {
        const isSignedUp = this.state.isSignedUp;
        this.setState({
            isSignedUp: !isSignedUp
        })
    }

    render() {

        const inputStyle = {
            floating: {
                ...floatingStyles,
                color: '#FFEB00',
                textShadow: '1px 1px 1px gray'
            },
            focus: {
                ...focusStyles,
                borderColor: '#FFEB00',
            },
            input: {
                ...inputStyles,
                width: '100%',
                background: ' transparent'
            },
            label: {
                ...labelStyles,
                marginTop: '.7rem',
                width: '100%',
                color: 'black'
            }
        }

        const span = <span></span>

        let form = (
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={this.onSubmitHandler}>
                    <FloatingLabel
                        id='email'
                        name='email'
                        placeholder='Email'
                        styles={inputStyle}
                        type='email'
                        onChange={(event) => this.onChangeHandler(event, 'email')}
                        pattern="\S+\.\S+@\S*alten\S*\.\S+"
                        title="Veuiller rentrer votre adresse email alten"
                        required
                    />
                    <FloatingLabel
                        id='password'
                        name='password'
                        placeholder='Mot de passe (6 char. min)'
                        styles={inputStyle}
                        type='password'
                        onChange={(event) => this.onChangeHandler(event, 'password')}
                        pattern=".{6,}"
                        title="At least 6 characters"
                        required
                    />
                    <button>Suivant</button>
                    <p className={styles.changeAuth} onClick={this.switchAuthModeHandler}>{!this.state.isSignedUp ? 'Créer un compte ?' : 'Vous avez déja un compte ?'}</p>
                </form>
            </div>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
                <div className={styles.Auth}>
                    <div className={styles.authWrapper}>
                        <h3>{!this.state.isSignedUp ? 'Connexion' : 'Création de compte'}</h3>
                        {this.state.isSignedUp &&
                            <p>Créez un compte avec votre adresse email Alten pour commencer à faire vos pronostics !</p>
                        }
                        {this.props.token && !this.props.bets &&
                            <Redirect to='/welcome' />
                        }
                        {this.props.token && this.props.bets &&
                            <Redirect to='/home' />
                        }
                        {form}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth_reducer.loading,
        token: state.auth_reducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actionTypes.auth(email, password, isSignedUp))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));