import logo from './logo.svg';
import './App.css';
import MyComponent from './component/MyComponent'
import Login from './component/Authentication/LoginUser';
import Register from './component/Authentication/RegisterUser';

function App() {
  return (
    <div className="App">
     <Login></Login>
     <Register></Register>
    </div>
  );
}

export default App;
