import React, { Component } from 'react';
import IdeaCard from '../components/idea_card';

class Backlog extends Component {
    render() {
      return(
        <div className="list backlog">
          <h3>Backlog</h3>
          {this._createIdeas()}
        </div>
      );
    }

    _createIdeas() {
      return this.props.ideas.map((idea) => {
        return (
          <IdeaCard 
              title={idea.title}
              body={idea.body}
              key={idea.id}
              ideaId={idea.id}
              status={idea.status}
              changeStatus={this.props.changeStatus}
              changeIdea={this.props.changeIdea}
              deleteIdea={this.props.deleteIdea}
              updateIdea={this.props.updateIdea}/>
          );
        });
    }
}

export default Backlog;