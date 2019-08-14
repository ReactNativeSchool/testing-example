import { createAppContainer, createStackNavigator } from "react-navigation";

import PostList from "./screens/PostList";
import Post from "./screens/Post";

const App = createStackNavigator({
  PostList: {
    screen: PostList,
    navigationOptions: {
      headerTitle: "Posts"
    }
  },
  Post: {
    screen: Post,
    navigationOptions: {
      headerTitle: "Post"
    }
  }
});

export default createAppContainer(App);
