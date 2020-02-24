import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

class GithubWebView extends Component {
  static NavigationOptions = ({ route }) => ({
    title: route.params.repository.name,
  });

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { route } = this.props;
    const { html_url } = route.params.repository;

    return <WebView source={{ uri: html_url }} style={{ flex: 1 }} />;
  }
}

export default GithubWebView;
