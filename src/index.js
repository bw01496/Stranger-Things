import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom"
import Login from "./components/Login"
import Posts from "./components/Posts"
import Register from "./components/Register"
import CreatePost from "./components/CreatePost"

import Profile from "./components/Profile"
import Messages from "./components/Messages"

/* You have a lot of unused import/variables here. Always make sure to go through and clean up things like this before
 * you're done. I don't just say this for my own sake - you will be expected to write clean and efficient code for work
 * as well. It's best to get used to the practice now. Your code editor probably has a search function to find any
 * console.log()'s to remove, and your linter will you show you syntactical errors like unused variables/imports. Finish
 * it up with a formatter like prettier to make it more readable. */

const cohortName = "2108-ECE-RM-WEB-PT"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

/* You left an empty object in the parameters declared for `App` and it caused the app to break on my end. I removed it */
const App = () => {
  const [token, setToken] = useState("")
  const [posts, setPosts] = useState([])
  const [user, setUsers] = useState("")

  const [userId, setUserId] = useState("")
  const [profile, setProfile] = useState({})
  console.log(userId)

  const navigate = useNavigate()
  const fetchPosts = async () => {
    const response = await fetch(`${APIURL}/posts`)
    const respObj = await response.json()
    const posts = respObj.data.posts
    if (posts) setPosts(posts)
  }
  useEffect(() => {
    try {
      fetchPosts()
    } catch (error) {
      console.error(error)
    }
  }, [token])

  return (
    <>
      <header>
        <h1> Stranger's Things</h1>

        <Link to="/">Home</Link>
        <br></br>
        <Link to="/posts"> Posts</Link>
        <br></br>
        <Link to="/account/login">Login</Link>
        <br></br>
        <Link to="/account/register">Register</Link>
        <br></br>
        <Link to="/profile">Profile</Link>

        <button
          className={token ? "" : "isLoggedIn"}
          onClick={() => {
            navigate("/account/login")
          }}
        >
          Log Out!
        </button>
      </header>
      <h2>Welcome to the Stranger's Thing App</h2>
      <p>Please Register and/or Login if you wish to post and send messages!</p>

      <Routes>
        <Route
          path="/account/login"
          element={<Login setToken={setToken} setUsers={setUsers} />}
        />
        <Route
          path="/account/register"
          element={<Register setToken={setToken} setUsers={setUsers} />}
        />

        <Route
          path="/posts"
          element={
            <>
              <CreatePost setPosts={setPosts} token={token} />{" "}
              <Posts posts={posts} token={token} fetchPosts={fetchPosts} />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              username={user}
              setUserId={setUserId}
              profile={profile}
              setProfile={setProfile}
              token={token}
            />
          }
        />
        <Route
          path="/messages"
          element={<Messages posts={posts} userId={userId} token={token} />}
        />
      </Routes>
    </>
  )
}
ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("app")
)
