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

    _updateCardsAbove(data) {
      let ideas = this.props.ideas.sort((a, b) => a - b);
      let stopNumber = data.columnIdeaCount;
      let dragIdeaPositon = Number(data.dragIdeaPosition);
      let draggedCardId = Number(data.dragIdeaId);
      let targetIdeaId = data.targetIdeaId;
      let targetIdeaPosition = Number(data.targetIdeaPosition);

      let targetIdeaIndex = ideas.findIndex(idea => { 
        return Number(idea.id) === Number(targetIdeaId); 
      });
      
      let aboveCards = ideas.slice(0, targetIdeaIndex + 1);

      let targetPosition = 0;

      axios.put("https://idea-box-api.herokuapp.com//api/v1/ideas/" + draggedCardId, {
        idea: {
          position: targetIdeaIndex
        }
      }).then(function(response) {
        });

      let i = 0;

      while(i < aboveCards.length) {
        let update = true;
        let selectIdea = aboveCards[i]
        let id = selectIdea.id;
        if(id === draggedCardId) {
          update = false
        }
        
        let self = this;
        if(update === true) {
        axios.put("https://idea-box-api.herokuapp.com//api/v1/ideas/" + id, {
          idea: {
            position: targetPosition
          }
        }).then(function(response) {
            self.props.fetchAllIdeas();
          });
        }
        
        if(update === true) {
          targetPosition+= 1;
        }

        i+= 1;
      }

    }

    _changeIdeas(data) {
      let ideas = this.props.ideas.sort((a, b) => a - b);
      let stopNumber = data.columnIdeaCount;
      let dragIdeaPositon = Number(data.dragIdeaPosition);
      let draggedCardId = data.dragIdeaId;
      let targetIdeaId = data.targetIdeaId;
      let targetIdeaPosition = Number(data.targetIdeaPosition);

      let targetIdeaIndex = ideas.findIndex(idea => { 
        return Number(idea.id) === Number(targetIdeaId); 
      });

      if(dragIdeaPositon < targetIdeaPosition) {
        this._updateCardsAbove(data);
        return;
      }

      let ideasAfterTarget = ideas.slice(targetIdeaIndex, stopNumber);
      let targetPosition   = targetIdeaPosition;

      axios.put("https://idea-box-api.herokuapp.com//api/v1/ideas/" + draggedCardId, {
        idea: {
          position: targetPosition
        }
      }).then(function(response) {
        });

        targetPosition+=1;

      let i = 0;

      while(i < ideasAfterTarget.length) {
        let update = true;
        let selectIdea = ideasAfterTarget[i]
        let id = selectIdea.id;

        if(id === Number(draggedCardId)) {
          update = false
        }
        
        let self = this;
        if(update === true) {
        axios.put("https://idea-box-api.herokuapp.com//api/v1/ideas/" + id, {
          idea: {
            position: targetPosition
          }
        }).then(function(response) {
            self.props.fetchAllIdeas();
          });
        }

        targetPosition+= 1;
        i+= 1;
      }
    }
}

export default Backlog;