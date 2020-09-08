import React from 'react';
import SettingsMain from '../../components/SettingsMain/SettingsMain';

export default class SettingsPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  
  onDeleteSuccess = () => {
    const { history } = this.props;
    const destination = '/play';
    history.push(destination);
  }
  
  render() {
    return (
      <SettingsMain onDeleteSuccess={this.onDeleteSuccess}/>
    );
  }
}