import React from 'react';
import firebase from 'firebase';
import loader from 'react-loader';

//Route for SignIn Page

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <header role="banner">
                    <h1>Stocks R Us</h1>
                    <div className="container">
                        <div className="login">
                            <h3>Login</h3>
                            <form method="post" action="index.html">
                                <p>
                                    <input type="text" name="login" placeholder="Username or Email" />

                                    <input type="password" name="password" placeholder="Password" />
                                </p>
                                <p className="remember_login">
                                    <label>
                                        <input type="checkbox" name="remember_login" id="remember_login" /> Remember me on this computer
                                    </label>
                                </p>
                                <p className="submit">
                                    <input type="submit" name="commit" value="Login" />
                                </p>
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default SignIn;