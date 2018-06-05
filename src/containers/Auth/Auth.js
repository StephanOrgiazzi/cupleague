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
        console.log(this.state);
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
                color: '#0680C9'
            },
            focus: {
                ...focusStyles,
                borderColor: '#0680C9'
            },
            input: {
                ...inputStyles,
                width: '100%',
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
                        required
                    />
                    <FloatingLabel
                        id='password'
                        name='password'
                        placeholder='Password'
                        styles={inputStyle}
                        type='password'
                        onChange={(event) => this.onChangeHandler(event, 'password')}
                        pattern="[A-Za-z0-9]{6,}"
                        title="Must be alphanumeric and contain at least 6 characters"
                        required
                    />
                    <button>Suivant</button>
                    <p className={styles.changeAuth} onClick={this.switchAuthModeHandler}>{this.state.isSignedUp ? 'Créer un compte ?' : 'Vous avez déja un compte ?'}</p>
                </form>
            </div>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.Auth}>
                <div className={styles.authWrapper}>
                    <h3>{this.state.isSignedUp ? 'Connexion' : 'Compte'}</h3>
                    {!this.state.isSignedUp &&
                        <p>Créez un compte pour commencer à faire vos pronostics !</p>
                    }
                    {form}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth_reducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actionTypes.auth(email, password, isSignedUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);