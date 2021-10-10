import React from "react"
import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
const Repos = () => {
  const { repos } = useGlobalContext()
  const languages = repos.reduce((total, repoItem) => {
    const { language, stargazers_count: stars } = repoItem
    if (!language) return total
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
        <div></div>
        <Doughnut2D data={mostPopular} />
        <div></div>
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
