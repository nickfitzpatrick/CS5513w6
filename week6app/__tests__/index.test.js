import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import data from '../data/persons.json'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })

  it('testing name', () => {
    render(<Home allData={data}/>)

    const link = screen.getByText('Alex Johnson')

    expect(link).toBeInTheDocument()
  })
})