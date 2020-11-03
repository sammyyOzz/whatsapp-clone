import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
import TransitionsModal from './TransitionsModal';


function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
      { !user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>

              <Route exact path="/modal">
                <TransitionsModal />
              </Route>
              
              <Route exact path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route exact path="/">
                <div className="app__home">
                    <img src="https://i.pinimg.com/originals/25/b9/24/25b924f1d18fea2c7dfcb26a9905c1e8.png" alt="Profile Image"/>
                    <h2>Coding is life...</h2>
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
