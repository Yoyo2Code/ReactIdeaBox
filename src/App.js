import React, { Component } from 'react';
import axios from 'axios';

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

  componentWillMount() {
    let self = this;
    axios.get('https://idea-box-api.herokuapp.com/api/v1/ideas')
    .then(function(response) {
      console.log(response);
      self.setState({ ideas: [ ...response.data ] });
    })
    .catch(function(response) {
      console.log(response);
    })
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

  _updateIdea(selectedIdea){
    let ideaId = selectedIdea.id;
    axios.put("https://idea-box-api.herokuapp.com/api/v1/ideas/" + ideaId, {
        idea: {
          title: selectedIdea.title,
          body: selectedIdea.body
        }
    }).then(function(response) {
      console.log(response);
    })
  }
}


export default App;
