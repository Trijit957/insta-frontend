import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../styles/Profile.css';


const Profile = () => {

    const [myPostData, setMyPostData] = useState([]);

    useEffect(() => {
      
       fetch('/mypost', {
           method: "get",
           headers: {
               "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
               "Content-Type": "application/json"
           }
       }).then(res=>res.json()).then(result => {
           console.log(result);
           setMyPostData(result);
       }) 
    },[]); 

    

    useEffect(() => {
        
        

    });

    return (
        

        
        <div className="profile">
            <div className="profile__header">
               <div className="profile__header__image">
                 <img src="https://wallsdesk.com/wp-content/uploads/2017/01/Mark-Zuckerberg-Computer-Wallpaper.jpg" 
                      alt="profile-pic" 
                      className="profile__header__image__profilePic" 
                 />
               </div>
               

               <div className="profile__header__info">
                   <div className="profile__header__info__name">
                       <h2>{JSON.parse(sessionStorage.getItem("user")).name}</h2>
                       <div className="profile__header__info__btn">
                       <Button 
                          
                          variant="contained" 
                          style={{
                              background: "white",
                              boxShadow: "0px 0px 5px 1px grey"
                          }}
                          component="span"
                          size="large"
                       >
                           Edit Profile</Button>
                       </div>
                       
                   </div>
                   <div className="profile__header__info__follow">
                     
                           <span className="post">80 posts</span>
                           <span className="followers">376 followers</span>
                           <span className="following">300 following</span>
                     
                      
                   </div>
                   <div className="profile__header__info__status">
                        <span>something...</span>
                        <span>something...</span>
                        <span>something...</span>
                   </div>
               </div>
              
            </div>
            
            <div className="profile__body">

                {
                  myPostData.map((mypost) => {
                      return (
                        <img src={mypost.image_url} 
                             alt="profile-pic" 
                             className="profile__body__image" 
                        />
                      )
                  })  
                }

          
            </div>
            
        </div>
    )
}

export default Profile;
