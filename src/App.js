import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'
import TransitionModal from './TransitionsModal'
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';


function App() {
  const [{ user }, dispatch] = useStateValue()

  const handleMenuOpen = () => {
    dispatch({
        type: actionTypes.SET_MENU,
        mobileMenu: true,
    })
  }

  return (
    <div className="app">
      { !user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <TransitionModal />

            <Switch>

              <Route exact path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route exact path="/">

                <div className="app__home">
                
                    <h3>Welcome </h3>
                    <h1>{user?.displayName}</h1>
                    <img src={user?.photoURL} alt="Profile"/>
                    <h5>You are on whatsappClone</h5>

                    <div className="app__homeHeader">
                      <h4>⏬ Click icon below to start a chat ⏬</h4>
                      <IconButton fontSize="large" onClick={handleMenuOpen} color="secondary">
                        <ForumIcon fontSize="large" />
                      </IconButton>
                    </div>
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
