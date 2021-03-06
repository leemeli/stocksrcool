import React from 'react';

class About extends React.Component {
    render() {
        return (
            <section className="container" id="aboutPage" role="region">
                <div className="row header">
                    <h2>Start exploring our virtual stock market by signing up!</h2>
                </div>
                <div className="about">
                    <p>
                        In light of recent political events, now more than ever it becomes more apparent that you should vote with your wallet, and this is the most true in the stock market. Investing in stocks is investing in a company, and people need to be informed on who their money is going to.
                    </p>
                    <p>
                        And with Stocks R Us, that power is in your hands.
                    </p>
                    <p>
                        With this app, you'll get experience with real-world stocks and get used to dealing with imaginary stocks, and see as your net worth increases or decreases based on price fluctuations that actually took place, all the while making sure that your money isn't funding companies whose ideals you do not support.
                    </p>
                    <p>
                        We <em>speculate</em> that you will become very knowledgable about the world of stocks and the political affiliations of their companies!
                    </p>
                </div>
            </section>
        );
    }

}

export default About;