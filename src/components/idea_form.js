import React, { Component } from 'react';
import axios from 'axios';

export default class IdeaForm extends Component {

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
    this._createIdea({title, body});
    this.props.addIdea({title, body});
  }

  _createIdea({title, body}) {
    axios.post('https://idea-box-api.herokuapp.com/api/v1/ideas', {
      idea: {
        title: title,
        body: body
      }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}