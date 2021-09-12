import React from "react";

function ErrorComponent({error}) {
  return (
    <>
      Error: {error.message}
      <br></br>
    </>
  )
}

export default ErrorComponent;