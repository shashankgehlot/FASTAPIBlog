import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Login from './component/Authentication/LoginUser';
import Register from './component/Authentication/RegisterUser';
import Navigation from './component/Navigation/navigationBar';
import BlogForm from './component/Blog/BlogForm';
import Post from './component/Blog/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// index.js or App.js
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// import './index.css'; // Your global styles
// import './UiElements/editorStyles.css'; // Your custom styles

const App = () => (
  <Router>
    <Navigation />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/create-blog" element={<BlogForm />} />
    <Route path="/post/:slug" element={<Post />} /> {/* New route with slug */}
    </Routes>
  </Router>
);


export default App;
