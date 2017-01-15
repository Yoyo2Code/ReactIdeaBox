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
                <form onSubmit={this.props.changeIdea}>
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
                <h4>{this.props.ideaId}</h4>
                <h3>Title: </h3>
                <p>{this.props.title}</p>
                <h3>Body: </h3>
                <p>{this.props.body}</p>

                <button>Delete</button>

            </div>
        );
    }

    _editingTitle(e){ 
      this.setState({ ...this.state, title: e.target.value })
    }

    _editingBody(e){ 
      this.setState({ ...this.state, body: e.target.value });
    }

    _allowEdits() {
      this.setState({show: true})
    }
}