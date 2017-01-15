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
        let i = 0;
        return this.props.ideas.map((idea) => {
            i += 1;
          return (
            <IdeaCard title={idea.title} body={idea.body} key={i} ideaId={i} changeIdea={this.props.changeIdea}/>
          );
        });
    }
}