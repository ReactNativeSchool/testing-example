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
import { api } from "../util/api";

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10
  },
  title: {
    fontWeight: "bold",
    marginTop: 20
  }
});

export interface PostProps {
  navigation: any;
}

export interface PostType {
  title?: string;
  body?: string;
  id?: number;
}

export interface CommentType {
  name: string;
  id: number;
}

export interface PostState {
  post: PostType;
  comments: Array<CommentType>;
}

class PostList extends React.Component<PostProps, PostState> {
  state: PostState = {
    post: {},
    comments: []
  };

  componentDidMount() {
    const postId = this.props.navigation.getParam("postId");
    this.getPost(postId);
    this.getComments(postId);
  }

  getPost = (postId: number) => {
    api(`/posts/${postId}`).then((post: PostType) => {
      this.setState({ post });
    });
  };

  getComments = (postId: number) => {
    api(`/posts/${postId}/comments`).then((comments: Array<CommentType>) => {
      this.setState({ comments });
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title} testID="post-title">
            {this.state.post.title}
          </Text>
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
