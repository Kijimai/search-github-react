import React from "react"
import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
const Repos = () => {
  const { repos } = useGlobalContext()
  const languages = repos.reduce((total, repoItem) => {
    const { language, stargazers_count: stars } = repoItem
    //if no language found, go to next in line for the function
    if (!language) return total
    //if the language doesnt exist, we create one initialized with a value of 1
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stars }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stars,
      }
    }
    return total
  }, {})

  // pull the values of stars and forks from each item in the repo and return a new object containing the name and amount of stars and forks sorted from lowest to highest
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count: stars, name, forks } = item
      total.stars[stars] = { label: name, value: stars }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    { stars: {}, forks: {} }
  )

  //take the last 5 items from the array and reverse the order
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()
  const chartData = [
    {
      label: "HTML",
      value: "13",
      color: "#e44a00",
    },
    {
      label: "CSS",
      value: "33",
      color: "#11BADA",
    },
    {
      label: "Javascript",
      value: "87",
      color: "#E7D736",
    },
  ]

  //creates an array off of an object and sort it from highest amount to lowest - up to 5 languages
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  //most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  return (
    <div className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
