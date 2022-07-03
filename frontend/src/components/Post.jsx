
const Post = ({data}) => {

    const {title, body, image, author_id} = data;

  return (
    <div className="card">
        <img src={image} alt={title} />
        <div className="title">{title.toUpperCase()}</div>
        <small className="card_small">{author_id.name} {author_id.lastName}</small>
    </div>
    
  )
}

export default Post