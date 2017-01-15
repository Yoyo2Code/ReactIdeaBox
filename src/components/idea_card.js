import React, { Component } from 'react';

export default class IdeaCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
          show: false,
          title: this.props.title,
          body: this.props.body,
          id: this.props.ideaId
        };
    }

    render() {
        if(this.state.show) {
            return (
              <div className="idea-card" >
                <form onSubmit={this._changeStuff.bind(this)} >
                <h4>{this.props.ideaId}</h4>
                  <h3>Title: </h3>
                    <input 
                      value={this.state.title}
                      onChange={this._editingTitle.bind(this)}/>
                  <h3>Body: </h3>
                    <input
                      value={this.state.body}
                      onChange={this._editingBody.bind(this)}/>
                 <button>Delete</button>
               </form>
             </div>
           );
       }

        return(
            <div className="idea-card" onClick={this._allowEdits.bind(this)} >
                <h4>{this.state.ideaId}</h4>
                <h3>Title: </h3>
                <p>{this.state.title}</p>
                <h3>Body: </h3>
                <p>{this.state.body}</p>

                <button>Delete</button>
            </div>
        );
    }

    _changeStuff(e) {
      e.preventDefault();
      this._allowEdits();
      this.props.changeIdea(e)
    }

    _editingTitle(e){ 
       let newTitle = e.target.value;
      let newState = {
          show: this.state.show,
          title: newTitle,
          body: this.state.body,
          id: this.state.ideaId
      }
      this.setState(newState);
    }

    _editingBody(e){ 
      let newBody = e.target.value;
      let newState = {
          show: this.state.show,
          title: this.state.title,
          body: newBody,
          id: this.state.ideaId
      }
      this.setState(newState);
    }

    _allowEdits(e) {
      this.setState({ 
        show: !this.state.show,
        title: this.state.title,
        body: this.state.body,
        id: this.state.id
      });
    }
}