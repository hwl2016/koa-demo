import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
    }
    add() {
        console.log('add', this.state.count)
        const count = this.state.count + 1;
        this.setState({
            count
        })
    }
    minus() {
        console.log('minus', this.state.count)
        const count = this.state.count - 1;
        this.setState({
            count
        })
    }
    render() {
        return (
            <div>
                <div>Home page</div>
                <div>count: {this.state.count}</div>
                <div>
                    <button type="button" onClick={this.add}>add</button>
                    <button type="button" onClick={this.minus}>minus</button>
                </div>
            </div>
        )
    }
}

export default Home;