import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h2>Home Page</h2>
        <PostList endpoint="post" />
      </div>
    </>
  );
}

export default Home;
