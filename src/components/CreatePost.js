import React, { useState } from "react"
import { callApi } from "../util/api"

const CreatePosts = ({ token, setPosts }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log({ title, description, price, location })
    /* This API call below appears to be useless. Since it's on a remote server and thus unpredictable and potentially
     * slow, you should avoid doing unnecessary asynchronous operations like this */
    const response = await callApi({
      url: "/posts",
      method: "POST",
      token,
      body: {
        post: {
          title,
          description,
          price,
          location
        }
      }
    })
    console.log("response: ", response)
    // Check out utils/api.js for a note about `callApi()` and your handling of the `data` key
    const respPost = await callApi({ url: "/posts", token })
    console.log("respPost: ", respPost)
    console.log(setPosts)
    setPosts(respPost.data.posts)
  }
  return (
    <>
      {token && <h3>Create a Post!</h3>}
      <form onSubmit={handleSubmit}>
        {token && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        )}
        {token && (
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        )}

        {token && (
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
        )}

        {token && (
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          ></input>
        )}

        {token && (
          <button type="submit" className="btn btn-outline-primary">
            Posts!
          </button>
        )}
      </form>
    </>
  )
}

export default CreatePosts
