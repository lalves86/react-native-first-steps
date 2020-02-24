import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static NavigationOptions = ({ route }) => ({
    title: route.params.user.name,
  });

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const { route } = this.props;
    const { login } = route.params.user;
    const { stars, page } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${login}/starred?page=${page}`);

    const updatedPage = page + 1;

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      page: updatedPage,
      refreshing: false,
    });
  };

  refreshList = async () => {
    await this.setState({
      refreshing: true,
      stars: [],
      page: 1,
      loading: true,
    });

    this.loadMore();
  };

  handleWebView = repository => {
    const { navigation } = this.props;

    navigation.navigate('GithubWebView', { repository });
  };

  render() {
    const { route } = this.props;
    const { stars, loading, page, refreshing } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: route.params.user.avatar }} />
          <Name>{route.params.user.name}</Name>
          <Bio>{route.params.user.bio}</Bio>
        </Header>
        {loading && page === 1 ? (
          <ActivityIndicator color="#f4511e" />
        ) : (
          <>
            <Stars
              onRefresh={this.refreshList}
              refreshing={refreshing}
              onEndReachedThreshold={0.2}
              onEndReached={stars.length >= 30 && this.loadMore}
              data={stars}
              keyExtractor={star => String(star.id)}
              renderItem={({ item }) => (
                <Starred onPress={() => this.handleWebView(item)}>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
            {loading && <ActivityIndicator color="#f4511e" />}
          </>
        )}
      </Container>
    );
  }
}
