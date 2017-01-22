import React, { Component } from 'react';
import axios from 'axios';

import IdeaForm from './components/idea_form';
import IdeaList from './containers/idea_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ideas: [] };
  }

  render() {
    return (
      <div className="App">
        <IdeaForm createIdea={this._createIdea.bind(this)} />
        <IdeaList 
          fetchAllIdeas={this._fetchAllIdeas.bind(this)}
          ideas={this.state.ideas}
          changeIdea={this._changeIdea.bind(this)}
          deleteIdea={this._deleteIdea.bind(this)}
          updateIdea={this._updateIdea}
          addIdeaToAppState={this._addIdeaToAppState.bind(this)}/>
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

  _fetchAllIdeas() {
    let self = this;
    axios.get(
      'https://idea-box-api.herokuapp.com/api/v1/ideas'
      ).then(function(response) {
      self.setState({ ideas: [ ...response.data ] });
    }).catch(function(response) {
      console.log(response);
    })
  }

  _addIdea(idea) {
    this.setState({ ideas: this.state.ideas.concat(idea) });
  }

  _changeIdea(e) {
    e.preventDefault();
    let children = e.target.parentElement.children;
    let id = children[0].innerHTML;
    let title = children[2].value;
    let body = children[4].value;
    this._updateIdea({id, title, body})
  }

  _updateIdea(selectedIdea){
    let ideaId = Number(selectedIdea.id);
    axios.put("https://idea-box-api.herokuapp.com/api/v1/ideas/" + ideaId, {
        idea: {
          title: selectedIdea.title,
          body: selectedIdea.body
        }
    }).then(function(response) {
      console.log(response);
    })
  }

  _deleteIdea(e) {
    let id = e.target.parentElement.children[0].innerText;
    let newState = this.state.ideas.filter(idea => {
      return idea.id !== Number(id);
    });
    axios.delete("https://idea-box-api.herokuapp.com/api/v1/ideas/" + id);
    this.setState({ideas: newState});
  }

    _createIdea({title, body}) {
      let self = this;
      axios.post('https://idea-box-api.herokuapp.com/api/v1/ideas', {
        idea: {
          title: title,
          body: body
        }
      })
      .then(function (response) {
        self._addIdea(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    _addIdeaToAppState(newIdea) {
      let allIdeas = this.state.ideas;
      let filteredIdeas = allIdeas.filter(idea => {
        if(idea.id !== newIdea.id) {
          return idea;
        }
      });
      allIdeas = filteredIdeas.concat(newIdea);
      this.setState({ideas: allIdeas});
    }
}


export default App;
