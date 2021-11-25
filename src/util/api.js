const WEB = "https://strangers-things.herokuapp.com/api/2108-ECE-RM-WEB-PT"

export const callApi = async ({ url, method, body, token }) => {
  /* By destructuring in your parameters, you have essentially declared that this function expects to take **ONE**
   * parameter
   */
  console.log(token)
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    if (token) options.headers["Authorization"] = `Bearer ${token}`
    const response = await fetch(`${WEB}${url}`, options)
    /* The `response` object has on it a `data` key already. If you were to destructure `data` below, you'd already be
     * stripping the unnecessary material and grabbing the data you want, then returning that from the function. You'd
     * then be saving yourself a little time and space in your other files because you've now eliminated the need to pull
     * `data` off the object that comes back from this function */
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
