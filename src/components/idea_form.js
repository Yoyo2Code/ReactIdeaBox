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
    let idea = this._createIdea({title, body});
  }

  _createIdea({title, body}) {
    let self = this;
    axios.post('https://idea-box-api.herokuapp.com/api/v1/ideas', {
      idea: {
        title: title,
        body: body
      }
  })
  .then(function (response) {
    let { id, title, body } = response.data;
    self.props.addIdea({id, title, body});
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}