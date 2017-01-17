import React, { Component } from 'react';

class IdeaCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
          show: false,
          title: this.props.title,
          body: this.props.body,
          id: this.props.ideaId,
          status: this.props.status,
          editTitle: false,
          editBody: false
        };
    }

    render() {
        return(
            <div className="idea-card" 
              id={this.props.positionNum} 
              draggable="true" 
              onDragStart={this.drag.bind(this)}
              onDrop={this.drop.bind(this)}
              onDragOver={this.allowDrop.bind(this)} >
                <h4>{this.state.id}</h4>
                <h3>Title: </h3>
                { this._editingTitle() }
                <h3>Body: </h3>
                { this._editingBody() }
                <br/>

                <button onClick={this.props.deleteIdea} >Delete</button><br />
                <button onClick={this.props.changeStatus}>{`Move to ${this.props.status}`}</button>
            </div>
        );
    }

    allowDrop(ev) {
      ev.preventDefault();
    }

    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      let draggedCard = document.getElementById(data);
      let columnNameForDragged = document.getElementById(data).parentElement.id
      let columnNameForTarget  = ev.target.parentElement.id;

      if(columnNameForDragged === columnNameForTarget) {
        this.props.moveIdea({
          draggedCard: draggedCard,
          targetCard: ev.target
        });
      }
    }

    _editTitle() {
      let newState = {editTitle: !this.state.editTitle}; 
      this.setState(newState);
    }

    _changeTitle(e) {
      let newTitle = e.target.value;
      this.setState({title: newTitle})
    }

    _makeChangesToTitle(e) {
      this._editTitle();
      let idea  = e.target.parentElement.children;
      let title = idea[2].value;
      let body  = idea[4].innerHTML;
      let id    = idea[0].innerText;
      this.props.updateIdea({id, title, body});
    }

    _editingTitle() {
      if(this.state.editTitle) {
        return(
          <input 
            value={this.state.title}
            onChange={this._changeTitle.bind(this)}
            onBlur={this._makeChangesToTitle.bind(this)}/>
        );
      } else {
          return(
            <p 
            onClick={this._editTitle.bind(this)} >
            {this.state.title}
            </p>
          );
      }
    }

    _editBody() {
      this.setState({editBody: !this.state.editBody});
    }

    _changeBody(e) {
      let newBody = e.target.value;
      this.setState({body: newBody})
    }

    _editingBody() {
      if(this.state.editBody) {
        return(
          <input 
            value={this.state.body}
            onChange={this._changeBody.bind(this)}
            onBlur={this._makeChangesToBody.bind(this)}/>
        );
      } else {
          return(
            <p 
            onClick={this._editBody.bind(this)} >
            {this.state.body}
            </p>
          );
      }
    }

    _makeChangesToBody(e) {
      this._editBody();
      let idea  = e.target.parentElement.children;
      let title = idea[2].innerHTML;
      let body  = idea[4].value;
      let id    = idea[0].innerText;
      this.props.updateIdea({id, title, body});
    }


    _allowEdits() {
      this.setState({ show: !this.state.show });
    }
}

export default IdeaCard;