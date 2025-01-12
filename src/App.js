import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Login from './component/Authentication/LoginUser';
import Register from './component/Authentication/RegisterUser';
import Navigation from './component/Navigation/navigationBar';
import BlogForm from './component/Blog/BlogForm';
import BlogEditForm from './component/Blog/BlogEdit';
import Post from './component/Blog/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import TrackingProvider from './Contextprovider/trackingProvider';


const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<BlogForm />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/topics" element={<Home />} />
        <Route path="/edit-blog/:id" element={<BlogEditForm isEdit={true} />} />
      </Routes>
    </>
  );
};

const MainApp = () => (
  <Router>
    <TrackingProvider>
      <App />
    </TrackingProvider>
  </Router>
);

export default MainApp;