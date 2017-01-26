import React, { Component } from 'react';
import axios from 'axios';

import Current from './current_list';
import Backlog from './backlog_list';

export default class IdeaList extends Component {
  constructor(props) {
    super(props);

    this.state = { ideas: [] };
  }
    render() {
        return(
          <div>
            {this._sortIdeas()}
          </div>
        );
    }

    _distributeIdeas([backlogIdeas, currentIdeas]) {
      return(
        <div className="idea-list" >
          <Backlog 
            fetchAllIdeas={this.props.fetchAllIdeas}
            ideas={backlogIdeas}
            changeStatus={this._updateStatusChange.bind(this)}
            deleteIdea={this.props.deleteIdea} 
            updateIdea={this.props.updateIdea} />
          <Current 
            fetchAllIdeas={this.props.fetchAllIdeas}
            ideas={currentIdeas} 
            changeStatus={this._updateStatusChange.bind(this)} 
            deleteIdea={this.props.deleteIdea}
            updateIdea={this.props.updateIdea} />
        </div>
      );
    }

    _sortIdeas() {
      let sortedIdeas = this.props.ideas.reduce((obj, idea) => {
        if(idea.status === "backlog") {
          obj[0].push(idea);
          return obj;
        } 
        
        if(idea.status === "current") {
          obj[1].push(idea);
          return obj;
        }
        
        return obj;
      }, [[],[]]);


      let backlogsSorted = sortedIdeas[0].sort(function(a, b) {
        return a.position - b.position
      });

      let currentSorted = sortedIdeas[1].sort(function(a, b) {
        return a.position - b.position
      });

      return this._distributeIdeas([backlogsSorted, currentSorted]);
    }

    _updateStatusChange(e) {
      let self = this;
      e.preventDefault();
      let targetIdea = e.target.parentElement;
      let id = targetIdea.children[0].innerText;
      let status = this._changeStatus(targetIdea.parentElement.id);

      axios.put("http://localhost:8080/api/v1/ideas/" + id, {
        idea: {
          status: status
        }
      }).then(function(response) {
          self.props.addIdeaToAppState(response.data);
        });
    }

    _changeStatus(status) {
      if(status === "backlog") {
        return "current";
      }

      if(status === "current") {
        return "backlog";
      }
    }
}