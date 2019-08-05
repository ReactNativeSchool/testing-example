import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View
} from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 10
  }
});

class PostList extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                this.props.navigation.navigate("Post", { postId: item.id })
              }
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default PostList;
