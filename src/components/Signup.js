import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

import { useSnackbar } from 'notistack';
import swal from 'sweetalert';


import Footer from './Footer';
import '../styles/Signup.css';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const SignupData = () => {
        if(!email || !name || !password) {
            enqueueSnackbar("All fields are required!", { variant: 'error'});
            return;
        }
        if(!email_pattern.test(email)) {
            enqueueSnackbar("Invalid Email ID!", { variant: 'error'});
            return;
        }
        if(!password_pattern.test(password)) {
            enqueueSnackbar("Password should contain atleast 8 characters, 1 number, 1 uppercase letter and 1 special character.", { variant: 'error'});
            return;
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(res => res.json()).then(data => {
            if(data.error) {

                enqueueSnackbar(data.error, { variant: 'error'});
            }
            else {
                swal("Signed Up Successfully!", data.message, "success");

                history.push('/signin');
                
                
            }
        })
    }
    
    return (
        
        <div className="signup">
            <Card className="signup__card-1">
                <CardContent>
                    <h2 className="signup__card-1__logo">Instagram</h2>
                    <h5 className="signup__card-1__subtitle">Sign up to see photos and videos from your friends.</h5>
                   
                <form autoComplete="off">
                <FormControl variant="outlined" className="outline">
                   <InputLabel htmlFor="component-outlined">Email</InputLabel>
                   <OutlinedInput 
                      id="component-outlined" 
                      label="Email"
                      value={email}
                      onChange={
                          (event) => setEmail(event.target.value) 
                      }
                   />
                </FormControl> 

                <FormControl variant="outlined" className="outline">
                   <InputLabel htmlFor="component-outlined">Name</InputLabel>
                   <OutlinedInput 
                       id="component-outlined" 
                       label="Name" 
                       value={name}
                       onChange={
                          (event) => setName(event.target.value) 
                      }
                    />
                </FormControl>

                <FormControl variant="outlined" className="outline">
                   <InputLabel htmlFor="component-outlined">Password</InputLabel>
                   <OutlinedInput 
                        type="password" 
                        id="component-outlined" 
                        label="Password" 
                        value={password}
                        onChange={
                          (event) => setPassword(event.target.value) 
                      }
                    />
                </FormControl>
                </form>
                <Button 
                    variant="contained" 
                    size="large" 
                    className="signup__card-1__btn"
                    onClick={SignupData}
                >Sign up</Button>
                <h5>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h5>
                </CardContent>
            </Card>

            <Card className="signup__card-2" style={{textAlign: "center"}}>
                <CardContent>
                    Have an account? <Link to='/signin' className='signup__card-2__link'>Log in</Link>
                   
                </CardContent>
            </Card>
            
            
    
           
         <Footer />
        </div>
        
    )
}

export default Signup;
