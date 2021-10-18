import React from "react"
import { Info, Repos, User, Search, Navbar } from "../components"
import loadingImage from "../images/preloader.gif"
import Loader from "../components/Loader"
import { GithubContext, useGlobalContext } from "../context/context"
const Dashboard = () => {
  const { isLoading } = useGlobalContext()

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <Loader />
      </main>
    )
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
