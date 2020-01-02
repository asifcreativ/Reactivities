import axios from 'axios';
import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/Values').then(resp => {
      this.setState({
        values: resp.data
      });
    });
  }

  render() {
    return (
      <div>

        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>

        <List>
          {this.state.values.map((el: any) => <List.Item key={el.id}>{el.name}</List.Item>)}
        </List>

      </div>
    );
  }

}

export default App;
