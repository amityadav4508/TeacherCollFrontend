import React from 'react'
import { HashLoader} from "react-spinners"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const Loader = () => {
  const loading=true
  const color="#1C87E7"
  return (
    <div className="d-flex position-absolute zIndex1 justify-content-center">
    <HashLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}

export default Loader