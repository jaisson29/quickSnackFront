import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>
        <Link to="/">Go back home.</Link>
      </p>
    </>
  )
}

export default PageNotFound
