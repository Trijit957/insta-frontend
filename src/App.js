import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Header from "./components/Header";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";

import { SnackbarProvider } from 'notistack';

export const userContext = createContext();

const initialState = {
  jwt: '',
  user: {}
}

function reducer(state,action) {
    if(action.type === 'USER')
    {
        return action.payload;
    }
    if(action.type === '') 
    {
        return null;
    }
    return state;
}



function App() {

  const [state,dispatch] = useReducer(reducer,initialState);  

  return (
    <userContext.Provider value={{ state, dispatch }}>
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
              <SnackbarProvider maxSnack={3}>
                
                  <Signup />
               
              </SnackbarProvider>
          </Route>

          <Route path="/signin">
            <SnackbarProvider maxSnack={3}>
              <Signin />
            </SnackbarProvider>
          </Route>

          <Route path="/home">
            <Header />
            <Post  />
          </Route>

          <Route path="/profile">
             <Header />
             <Profile />
          </Route>

          <Route path="/createpost">
             <Header />
             <SnackbarProvider maxSnack={3}>
                <CreatePost />
             </SnackbarProvider>
          </Route>
        </Switch>
      </Router>
      {/* <Header /> */}
     </div>
    </userContext.Provider>
  );
}

export default App;
