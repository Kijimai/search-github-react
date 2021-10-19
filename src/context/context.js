import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  //request loading
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  //error
  const [error, setError] = useState({
    show: false,
    message: "",
  })

  //Search for user on submit
  const searchGithubUser = async (user) => {
    toggleError()
    setIsLoading(true)
    if (user === "") {
      setIsLoading(false)
      toggleError(true, "Unable to search for empty username.")
      return
    }
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    console.log(response)
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data

      //pass in an array of functions that return a promise to settle
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((result) => {
          //destructured from the result's arrays
          const [repos, followers] = result
          const status = "fulfilled"
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
          console.log(result)
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, "No user with that username was found.")
    }
    checkRequests()
    setIsLoading(false)
  }

  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          //throw an error
          toggleError(true, "Sorry, you have exceeded your hourly rate limit.")
        }
      })
      .catch((err) => console.log(err))
  }

  const toggleError = (show = false, message = "") => {
    setError({ show, message })
  }

  useEffect(checkRequests, [])
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        isLoading,
        setIsLoading,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider }
