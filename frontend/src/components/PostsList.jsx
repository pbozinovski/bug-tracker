import Post from './Post'
import { useQuery, gql } from '@apollo/client';


const GET_POSTS = gql`
    query getPosts {
        posts{
            id
            title
            body
            image
            author_id{
                name
                lastName
            }
        }
    }
`

const PostsList = () => {

    const {loading, error, data} = useQuery(GET_POSTS);

    if(loading) return "Loading...."
    if(error) return "Something went wrong..."

    return (
        <div className="cardList">
            {data.posts.map(post => <Post key={post.id} data={post}></Post>)}
        </div>
    )
}

export default PostsList