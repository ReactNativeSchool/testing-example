import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import { api } from "../util/api";

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 20,
  },
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


const Post = ({ navigation }: PostProps) => {
  const [post, setPost] = React.useState<PostType>({});
  const [comments, setComments] = React.useState<Array<CommentType>>([]);
  React.useEffect(() => {
    const postId = navigation.getParam("postId");
    getPost(postId);
    getComments(postId);
  }, []);

  const getPost = (postId: number) => {
    api(`/posts/${postId}`).then((post: PostType) => {
      setPost(post);
    });
  };

  const getComments = (postId: number) => {
    api(`/posts/${postId}/comments`).then((comments: Array<CommentType>) => {
      setComments(comments);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} testID="post-title">
          {post.title}
        </Text>
        <Text>{post.body}</Text>
        <Text style={styles.title}>Comments</Text>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
