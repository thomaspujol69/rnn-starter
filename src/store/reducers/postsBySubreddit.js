import { 
    REQUEST_POSTS,
    RECEIVE_POSTS,
    FAIL_RECEIVE_POSTS,
} from '../actions';

const initialStatePostsBySubreddit = {};
const initialStatePosts = {
    isFetching: false,
    items: [],
    error: null,
    lastUpdated: null,
}

const posts = (state = initialStatePosts, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                error: null,
            }
        case FAIL_RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                lastUpdated: action.receivedAt,
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                error: null,
                lastUpdated: action.receivedAt,
            }
        default:
          return state
      }
}

const postsBySubreddit = (state = initialStatePostsBySubreddit, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
        case FAIL_RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            }
        default:
            return state
    }
}

export default postsBySubreddit;