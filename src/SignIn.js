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
                <div className="container">
                    <div className="row header">
                        <h3>Start exploring our virtual stock market by signing up!</h3>
                    </div>
                    <div className="row body">
                        <form action="#">
                            <ul>
                                <li>
                                    <p className="left">
                                        <label>Name</label>
                                        <input type="text" name="first_name" placeholder="Jack Johnson" />
                                    </p>
                                </li>
                                <li>
                                    <p className="pull-right">
                                        <label>Email <span className="req">*</span>
                                        </label>
                                        <input type="text" name="last_name" placeholder="jack.johnson@gmail.com" />
                                    </p>
                                </li>
                                <li>
                                    <p className="left">
                                        <label>Desired Username</label>
                                        <input type="text" name="username" placeholder="JackJohnson123" />
                                    </p>
                                </li>
                                <li>
                                    <p className="pull-right">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="Password" />
                                    </p>
                                </li>
                                <li>
                                    <input className="btn btn-submit" type="submit" value="Register" />
                                </li>
                            </ul>
                        </form>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore cumque, obcaecati ex eveniet reiciendis, quaerat placeat itaque totam magnam aperiam repellat quis possimus perspiciatis debitis incidunt. Natus molestiae non nobis.</p>
                    <p>Excepturi, vitae veniam doloremque nihil reprehenderit adipisci, perspiciatis, assumenda laudantium molestiae blanditiis tempore saepe odio. Ipsum nobis, nulla molestias. Alias dolorem voluptatem, voluptatibus eveniet, aspernatur nesciunt cumque iste sint sed.</p>
                </div>
            </div>
        );
    }
}

export default SignIn;