import React, { Component } from 'react';

import IdeaForm from './components/idea_form';
import IdeaList from './containers/idea_list';

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
        <IdeaList ideas={this.state.ideas} changeIdea={this._changeIdea.bind(this)}/>
      </div>
    );
  }

  _addIdea(idea) {
    this.setState({ ideas: this.state.ideas.concat(idea) });
  }

  _changeIdea(e) {
    e.preventDefault();
    let children = e.target.children;
    let id = children[0].innerHTML;
    let title = children[2].value;
    let body = children[4].value;
    this._updateIdea({id, title, body})
  }

  _updateIdea(idea){
    console.log(idea);
  }
}


export default App;
