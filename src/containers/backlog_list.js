import React, { Component } from 'react';
import axios from 'axios';

import IdeaCard from '../components/idea_card';

class Backlog extends Component {
  constructor(props) {
    super(props);

    this.state = {ideaCount: 0, orderedIdeas: []};
  }

    render() {
      return(
        <div className="list" id="backlog">
          <h3>Backlog</h3>
          {this._createIdeas()}
        </div>
      );
    }

    _createIdeas() {
      let ideaCount = 0;
      let ideaCards = this.props.ideas.map((idea) => {
        let card = (
          <IdeaCard 
              title={idea.title}
              body={idea.body}
              key={idea.id}
              positionNum={ideaCount + "-" + idea.id}
              ideaId={idea.id}
              status={idea.status}
              changeStatus={this.props.changeStatus}
              changeIdea={this.props.changeIdea}
              deleteIdea={this.props.deleteIdea}
              updateIdea={this.props.updateIdea}
              moveIdea={this._moveIdea.bind(this)}/>
          );
          ideaCount+=1;
          return card;
        });
        return ideaCards;
    }

    _moveIdea({draggedCard, targetCard}) {

      let dragged = draggedCard.id.split("-");
      let target = targetCard.id.split("-");

      let dragIdeaPosition = dragged[0];
      let dragIdeaId = dragged[1];

      let targetIdeaPosition = target[0];
      let targetIdeaId = target[1];

      let columnIdeaCount = this.props.ideas.length;


      this._changeIdeas({
        dragIdeaPosition,
        dragIdeaId,
        targetIdeaPosition,
        targetIdeaId,
        columnIdeaCount
      });
    }

    _changeIdeas(data) {
      let ideas = this.props.ideas.sort((a, b) => a - b);
      let stopNumber = data.columnIdeaCount;
      let newPosition = data.targetIdeaPosition;
      let draggedCardId = data.dragIdeaId;
      let targetIdeaId = data.targetIdeaId;
      let targetIdeaPosition = Number(data.targetIdeaPosition);

      let targetIdeaIndex = ideas.findIndex(idea => { 
        return Number(idea.id) === Number(targetIdeaId); 
      });

      let ideasAfterTarget = ideas.slice(targetIdeaIndex + 1, stopNumber);

      let targetPosition = targetIdeaPosition + 1; // HERE
      let newIdeas = [];

      axios.put("https://idea-box-api.herokuapp.com/api/v1/ideas/" + draggedCardId, {
        idea: {
          position: targetPosition
        }
      }).then(function(response) {
          newIdeas.push(response.data);
          console.log("I got this first: ", response.data)
        });

        targetPosition+=1;

      let i = 0;
      while(i < ideasAfterTarget.length) {
        // debugger;
        let selectIdea = ideasAfterTarget[i]
        let id = selectIdea.id;

        if(id === Number(draggedCardId)) {
          i+=1;
          return;
        }
        

        axios.put("https://idea-box-api.herokuapp.com/api/v1/ideas/" + id, {
          idea: {
            position: targetPosition
          }
        }).then(function(response) {
          newIdeas.push(response.data);
          console.log("I updated this: ", response.data);
        })

        targetPosition+= 1;
        i+= 1;
      }
      // i = 0;
      return newIdeas;
    }
}

export default Backlog;