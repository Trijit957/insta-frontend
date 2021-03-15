import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Card from '@material-ui/core/Card';
import '../styles/CreatePost.css';

import { useSnackbar } from 'notistack';
import swal from 'sweetalert';

import { storage } from '../Firebase/firebase';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [image_url, setImage_url] = useState('');

    useEffect(() => {
        if(image_url) {

        fetch('/createpost', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                title,
                body,
                image_url
            })
        }).then(res => res.json())
          .then(data => {
               
                if(data.error) {
                   enqueueSnackbar(data.error, { variant: 'error'});
                }
                else {
                    
                    console.log(data);
                    swal("Published Successfully!", "", "success");
                    history.push('/home');
                    
                    
                }
            })
        }
    },[image_url]);

    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
            setFile(URL.createObjectURL(event.target.files[0]));
        }
    }
    
    const postDetails = () => {
        if(!image) {
            enqueueSnackbar("Please add all the fields!", { variant: 'error'});
            return;
        }
        
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    setImage_url(url);
                });
            }
        );

        
             
        }

    
    return (
        
          <div className="createpost">
            <Card className="createpost__card">
            <h2>New Post</h2>
            <form autoComplete="off" className="createpost__form">
            <TextField 
               
               id="outlined-basic" 
               label="Title" 
               variant="outlined"
               fullWidth={true}
               value={title}
               onChange={
                   (event) => {
                       setTitle(event.target.value);
                       console.log(title);
                   }
               }
               style={{marginBottom: "10px"}}
             />
            <TextField
              
               id="outlined-multiline-basic"
               label="Write a Caption!"
               multiline
               rows={10}
               variant="outlined"
               fullWidth={true}
               value={body}
               onChange={
                   (event) => {
                       setBody(event.target.value);
                       console.log(body);
                   }
               }
               style={{marginBottom: "10px"}}
             />
             <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="raised-button-file">
                 <Button 
                    
                    variant="contained" 
                    component="span"
                    size="large"
                    fullWidth={true}
                    startIcon={<AddAPhotoIcon />}
                    style={{marginBottom: "10px"}}

                 >
                     Upload picture
                 </Button>
                { file && <span>Preview: <img src={file} alt="test" className="createpost__image" /></span>} 
                
              </label>
              <Button
                  variant="contained" 
                  color="primary"
                  component="span"
                  size="large"
                  style={{float: "right"}}
                  onClick={postDetails}
               >
                   Publish
               </Button>
              
            </form>
            </Card>
        </div>
        
    )
}

export default CreatePost;
