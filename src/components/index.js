import React, { Component } from 'react'
import Index from './Index'
import Home from './Home'
import Editor from './Editor'
import { Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga';
import axios from 'axios';
import config from '../../package.json';
const mathLive = DEBUG_MODE ? require('../../mathlive/src/mathlive.js')
    : require('../lib/mathlivedist/mathlive.js');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: {
                problems: []
            },
            saved: false,
            problem: {}
        }
    }

    getProblemById(problems, id) {
        const isProblem = p => p.id === id;
        return problems.find(isProblem);
    }

    createNewSolution(history, solution) {
        axios.post(`${config.serverUrl}/solution/new`, solution)
            .then(response => {
                this.setState({problem: response.data.problem});
                history.push('/edit/' + response.data.shareCode);
            })
    }

    render() {
        ReactGA.initialize(GA_ACCOUNT_ID);
        return (
            <Switch>
                <Route exact path='/set/:code' render={p => <Home {...p}
                    changeDataSet={id => {this.setState({problems: this.props.dataSets[id]},
                        mathLive.renderMathInDocument());}}
                    saved={this.state.saved} dialogDisplayed={()=>this.setState({saved: false})} 
                    setData={set => this.setState({dataSet: set})} problems={this.state.dataSet.problems} 
                    createNewSolution={(history, solution) => this.createNewSolution(history, solution)} />} />
                <Route exact path='/edit/:number' render={p =>
                    <Editor {...p} problem={this.state.problem} //TODO: allowedPalettes
                        savedProblem={()=>this.setState({saved: true})} />} />
                <Route exact path='/' render={p => <Index {...p} />} />
            </Switch>
        )
    }
}
