import React, { Component } from 'react';

import IdeaCard from '../components/idea_card';

export default class IdeaList extends Component {
    constructor(props) {
      super(props);

      this.state = { ideas: this.props.ideas };
    }

    render() {
        return(
          <div className="idea-list" >
            {this._createIdeas()}
          </div>
        );
    }

    _createIdeas() {
        return this.props.ideas.map((idea) => {
          return (
            <IdeaCard title={idea.title} body={idea.body} key={idea.id} ideaId={idea.id} changeIdea={this.props.changeIdea}/>
          );
        });
    }
}