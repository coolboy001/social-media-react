import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import Footer from "./components/footer";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import PostList from "./components/PostList";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  return (
    <div className='app-container'>
      <Sidebar selectedTab={selectedTab} />
      <div className='content'>
        <Header />
        {selectedTab === "Home" ? <PostList /> : <CreatePost />}
        <PostList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
