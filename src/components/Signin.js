import React, { useState, useContext } from 'react';
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
import '../styles/Signin.css';

import { userContext } from '../App';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const { state, dispatch } = useContext(userContext);
    

    const SigninData = () => {
        if(!email || !password) {
            enqueueSnackbar("All fields are required!", { variant: 'error'});
            return;
        }
        if(!email_pattern.test(email)) {
            enqueueSnackbar("Invalid Email ID!", { variant: 'error'});
            return;
        }
       
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json()).then(data => {
            if(data.error) {

                enqueueSnackbar(data.error, { variant: 'error'});
            }
            else {
                sessionStorage.setItem("jwt",data.token);
                sessionStorage.setItem("user",JSON.stringify(data.user));
 
                swal("Signed In Successfully!", "", "success");
               
                dispatch({type: 'USER', payload: {jwt: data.token, user: data.user}});
                history.push('/home');
               
                
            }
        })
    }

    return (
        <div className="signin">
            <Card className="signin__card-1">
                <CardContent>
                    <h2 className="signin__card-1__logo">Instagram</h2>
                    
                    
                <form autoComplete="off">
                <FormControl variant="outlined" className="outline">
                   <InputLabel htmlFor="component-outlined">Email</InputLabel>
                   <OutlinedInput 
                       id="component-outlined" 
                       label="Email"
                       value={email}
                       onChange={
                           (event) => {
                               setEmail(event.target.value);
                           }
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
                           (event) => {
                               setPassword(event.target.value);
                           }
                       }
                    />
                </FormControl>
                </form>
                <Button 
                   variant="contained" 
                   size="large" 
                   className="signin__card-1__btn"
                   onClick={SigninData}
                >Log in</Button>
                <hr />
                <h5>Forgot password?</h5>
                </CardContent>
            </Card>

            <Card className="signin__card-2" style={{textAlign: "center"}}>
                <CardContent>
                   Don't have an account? <Link to='/' className='signin__card-2__link'>Sign up</Link>
                </CardContent>
            </Card>
            
            <Footer />
        </div>
    )
}

export default Signin;
