import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View
} from "react-native";
import { api } from "../util/api";

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 10
  }
});

// Types
export interface item {
  id: number;
  title: string;
}

export interface PostRowProps {
  item: item;
  index: number;
  onPress: () => void;
}

export interface PostListProps {
  navigation?: any;
}

interface RenderItemType {
  item: item;
  index: number;
}

export const PostRow = ({ item, index, onPress }: PostRowProps) => (
  <TouchableOpacity
    testID={`post-row-${index}`}
    style={styles.row}
    onPress={onPress}
  >
    <Text>{item.title}</Text>
  </TouchableOpacity>
);

const PostList = ({navigation}: PostListProps) => {
  
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    api("/posts")
      .then(posts => {
         setPosts(posts);
         setLoading(false);
         setError(null) ;
      })
      .catch(error => {
        setLoading(false);
        setError(error.message ) ;
      });
  };


    return (
      <SafeAreaView>
        <FlatList
          testID="post-list"
          data={posts}
          renderItem={({ item, index }: RenderItemType) => (
            <PostRow
              item={item}
              index={index}
              onPress={() =>
                navigation.navigate("Post", { postId: item.id })
              }
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => {
            if (loading) {
              return <Text testID="loading-message">Loading</Text>;
            }

            if (error) {
              return <Text testID="error-message">{error}</Text>;
            }

            return <Text testID="no-results">Sorry, no results found.</Text>;
          }}
        />
      </SafeAreaView>
    );
  
}

export default PostList;
