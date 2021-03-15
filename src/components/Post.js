import React, {useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeleteIcon from '@material-ui/icons/Delete';


import { userContext } from '../App';

import swal from 'sweetalert';
// import Heart from 'react-heart';

import '../styles/Post.css';
import { SwipeableDrawer } from '@material-ui/core';

const Post = () => {

    const [allPost, setAllPost] = useState([]);
    const { state, dispatch } = useContext(userContext);

    useEffect(() => {
        fetch('/allpost', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
            }
        }).then(res=>res.json())
        .then(result => {
            console.log(result);
            setAllPost(result);
        })
        
    },[]);

    const handleLikeUnlike = async (e,id) => {
        if(!e.target.classList.contains('red-color'))
           {
             
                                
        await fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                postID: id
            })
        }).then(res=>res.json())
          .then(result => {
              console.log(result);
              const newAllPost = allPost.map(item => {
                  if(item._id === result._id) {
                      return result;
                  }
                  else{
                      return item;
                  }
              });
              setAllPost(newAllPost);
          }).catch(err => console.log(err));
          e.target.classList.add('red-color');
          console.log('like');
        }
        else {
            
           await fetch('/unlike', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
                },
                body: JSON.stringify({
                    postID: id
                })
            }).then(res=>res.json())
              .then(result => {
                console.log(result);
                const newAllPost = allPost.map(item => {
                    if(item._id === result._id) {
                        return result;
                    }
                    else{
                        return item;
                    }
                });
                setAllPost(newAllPost);
    
              }).catch(err => console.log(err));

              e.target.classList.remove('red-color');
              console.log('unlike');
        }
    }

    const makeComment = (event,text,postID) => {
        event.preventDefault();
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                postID: postID,
                text: text
            })
        }).then(res=>res.json()).then(result => {
            console.log(result);
            const newAllPost = allPost.map(item => {
                if(item._id === result._id) {
                    return result;
                }
                else{
                    return item;
                }
                
            });
            setAllPost(newAllPost);

        }).catch(err => console.log(err));
    }

    const deletePost = (postid) => {
        swal("Are you sure?", "warning", {
            button: "",
          });
    }

    return (
        <div className="post">
            <div className="post__wrapper">
           {
               allPost.map((post) => {
                   return (
                    <Card className="post__card" key={post._id}>
                    <CardHeader
                       avatar={
                          <Avatar />
                       }
                       action={
                           post.postedBy._id == state.user._id && (

                           <IconButton>
                              <DeleteIcon onClick={(e) => {
                                  deletePost(post._id)
                              }} />
                           </IconButton>

                           )
                       }
     
                       title={post.postedBy.name}
                       
     
                    />
     
                    <CardMedia
                         className="post__image"
                         image={post.image_url}
                         
                    />
     
                    
                    <CardContent className="post__content">
                        <div className="post__content__icons">
                            
                                {
                                    post.likes.length > 0 ? (

                                    post.likes.filter((like) => like === JSON.parse(sessionStorage.getItem("user"))._id).length === 1 ? (
                                        <IconButton 
                                           className="post__content__icons__iconButton red-color"
                                           onClick={(e)=>handleLikeUnlike(e,post._id)}
                                        >
                                       <FavoriteIcon fontSize="large" className="heart-emoji" />
                                     </IconButton>

                                    ) : (
                                        <IconButton 
                                           className="post__content__icons__iconButton lightgray-color"
                                           onClick={(e)=>handleLikeUnlike(e,post._id)}
                                        >
                                          <FavoriteIcon fontSize="large" className="post__content__icons__heart-emoji" />
                                        </IconButton>

                                    )) : (
                                        <IconButton 
                                           className="post__content__icons__iconButton lightgray-color"
                                           onClick={(e)=>handleLikeUnlike(e,post._id)}
                                        >
                                          <FavoriteIcon fontSize="large" className="post__content__icons__heart-emoji" />
                                        </IconButton>

                                    )

                                

                                    
                                }
                               
                                              

                            <IconButton 
                               className="post__content__icons__iconButton lightgray-color"
                               onClick={
                                () => {
                                   document.querySelector('.cmt-box').focus();
                                   document.querySelector('#card-action-cmt-box').classList.toggle('card-action-cmt-box');
                                } 
                             } 
                            >
                                <ModeCommentIcon fontSize="large" />
                            </IconButton>

                        </div>
                       
                        <p>{post.likes.length} likes</p>
                        <h3 className="post__content__title">{post.title}</h3>
                        <h4 className="post__content__body">{post.body}</h4>
                    </CardContent>
                    {
                        post.comments.map(comment => {
                            return (
                                <h4><span key="comment._id">{ comment.postedBy.name }</span> {comment.text}</h4>
                            )
                        })
                    }
                    <hr />
                    <CardActions id="card-action-cmt-box">
                        
                        <form className="post__content__comment-form" onSubmit={(event) => {
                          
                            console.log(event.target[0].value,post._id);
                            makeComment(event,event.target[0].value, post._id);
                        }}>
                            <input 
                               type="text" 
                               placeholder="Add a comment..."
                               onFocus={() => {
                                document.querySelector('#card-action-cmt-box').classList.toggle('card-action-cmt-box');
                               }}
                         
                             />
                            <button type="submit">POST</button>
        
                        </form>
                    </CardActions>
                </Card>

                   )
               })
           }
                
          </div>
        </div>
    )
}

export default Post;
