import React, { Component } from 'react';

export default class IdeaForm extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      return(
        <div className="idea-form" onSubmit={e => this._onFormSubmit(e)} >
          <form>
            Title:
              <input type="text" id="title" /><br />
            Body:
              <input type="text" id="body" />
              <button type="submit" >Create Idea</button>
         </form>
        </div>
      );
  }

  _onFormSubmit(e) {
    e.preventDefault();
    let children = e.target.children;
    let title = children[0].value;
    let body = children[2].value;
    console.log(`title: ${title}, body: ${body}`);
  }
}