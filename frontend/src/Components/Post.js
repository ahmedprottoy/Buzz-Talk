import React from 'react'
import classes from '../Styles/post.module.css'
import { MoreVert, ThumbUp, Favorite } from '@material-ui/icons'

export default function Post() {
  return (
    <div className={classes.post}>
        <div className={classes.postWrapper}>
          <div className={classes.postTop}>
            <div className={classes.postTopLeft}>
                <img className={classes.postProfileImg} src='https://res.cloudinary.com/demo/image/facebook/65646572251.jpg' alt=''/>
                <span className={classes.postUsername}>John Doe</span>
                <span className={classes.postDate}>69 minutes ago</span>
            </div>
            <div className={classes.postTopRight}>
                <MoreVert/>
            </div>
          </div>
          <div className={classes.postCenter}>
            <span className={classes.postText}>Lorem ipsum dolor amet!</span>
            <img className={classes.postImg} src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt=''/>
          </div>
          <div className={classes.postBottom}>
            <div className={classes.postBottomLeft}>
                <ThumbUp className={classes.likeIcon}/>
                <Favorite className={classes.likeIcon}/>
                <span className={classes.postLikeCounter}>69 people liked it</span>
            </div>
            <div className={classes.postBottomRight}>
                <span className={classes.postCommentText}>32 comments</span>
            </div>
          </div>  
        </div>
    </div>
  )
}
