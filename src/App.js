import React, { Component } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Events from './components/Events';

class App extends Component {

  token = 'ZDIZEGL2GU7NBE4A344Y';
  order = 'date';

  state = {
    categories: [],
    events: []
  }

  componentDidMount(){
    this.getCategory();
  }

  getCategory = async() => {
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=en_EN`;

    await fetch(url)
          .then(answer => {
            return answer.json();
          })
          .then(categories => {
            this.setState({
              categories: categories.categories
            });
          });
  }

  getEvents = async(search) =>{
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${search.name}&categories=${search.categorie}&sort_by=${this.order}&token=${this.token}`;

    await fetch(url)
          .then(answer => {
            return answer.json();
          })
          .then(events => {
            this.setState({
              events: events.events
            });
          });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="uk-container">
          <Form categories = {this.state.categories}
          getEvents = {this.getEvents} />
          <Events events = {this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
