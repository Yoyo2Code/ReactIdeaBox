import React, { Component } from 'react';
import IdeaCard from '../components/idea_card';

class Current extends Component {
    render() {
      return(
        <div className="list current">
          <h3>Current</h3>
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
              changeIdea={this.props.changeIdea}
              changeStatus={this.props.changeStatus}
              deleteIdea={this.props.deleteIdea}
              updateIdea={this.props.updateIdea}/>
          );
        });
    }
}

export default Current;