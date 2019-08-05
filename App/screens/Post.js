import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  ScrollView
} from "react-native";

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10
  },
  title: {
    fontWeight: "bold",
    marginTop: 20
  }
});

class PostList extends React.Component {
  state = {
    post: {},
    comments: []
  };

  componentDidMount() {
    const postId = this.props.navigation.getParam("postId");
    this.getPost(postId);
    this.getComments(postId);
  }

  getPost = postId => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(post => {
        this.setState({ post });
      });
  };

  getComments = postId => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(comments => {
        this.setState({ comments });
      });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{this.state.post.title}</Text>
          <Text>{this.state.post.body}</Text>
          <Text style={styles.title}>Comments</Text>
          <FlatList
            data={this.state.comments}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PostList;
