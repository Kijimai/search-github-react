import React from "react"
import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
const Repos = () => {
  const { repos } = useGlobalContext()
  console.log(repos)

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
      value: "80",
      color: "#E7D736",
    },
  ]

  return (
    <div className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={chartData} />
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
