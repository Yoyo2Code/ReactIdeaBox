import React, { Component } from 'react';

import IdeaForm from './components/idea_form';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ideas: [] };
  }

  render() {
    return (
      <div className="App">
        <IdeaForm addIdea={this._addIdea.bind(this)} />
      </div>
    );
  }

  _addIdea(idea) {
    this.setState({ ideas: this.state.ideas.concat(idea) });
  }
}

export default App;
