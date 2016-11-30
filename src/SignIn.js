import React from 'react';

//Route for SignIn Page

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <header role="banner">
                    <h1>Stocks R Us</h1>
                    <div class="container">
                        <div class="login">
                            <h3>Login</h3>
                            <form method="post" action="index.html">
                                <p>
                                    <input type="text" name="login" placeholder="Username or Email" />
                                </p>
                                <p>
                                    <input type="password" name="password" placeholder="Password" />
                                </p>
                                <p class="remember_login">
                                    <label>
                                        <input type="checkbox" name="remember_login" id="remember_login" /> Remember me on this computer
                                    </label>
                                </p>
                                <p class="submit">
                                    <input type="submit" name="commit" value="Login" />
                                </p>
                            </form>
                        </div>
                    </div>
                </header>
                <div class="container">
                    <div class="row header">
                        <h3>Start exploring our virtual stock market by signing up!</h3>
                    </div>
                    <div class="row body">
                        <form action="#">
                            <ul>
                                <li>
                                    <p class="left">
                                        <label>Name</label>
                                        <input type="text" name="first_name" placeholder="Jack Johnson" />
                                    </p>
                                </li>
                                <li>
                                    <p class="pull-right">
                                        <label>Email <span class="req">*</span>
                                        </label>
                                        <input type="text" name="last_name" placeholder="jack.johnson@gmail.com" />
                                    </p>
                                </li>
                                <li>
                                    <p class="left">
                                        <label>Desired Username</label>
                                        <input type="text" name="username" placeholder="JackJohnson123" />
                                    </p>
                                </li>
                                <li>
                                    <p class="pull-right">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="Password" />
                                    </p>
                                </li>
                                <li>
                                    <input class="btn btn-submit" type="submit" value="Register" />
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