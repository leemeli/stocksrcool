import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer role="contentinfo">
                (c) Stocks R Us
                <ul id="contact">
                    <li><a href="#">About</a>
                    </li>
                    <li><a href="#">Contact</a>
                    </li>
                </ul>
            </footer>
        );
    }

}

export default Footer;