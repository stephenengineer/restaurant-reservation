import React from "react";
import ErrorComponent from "./ErrorComponent";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance or array of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  let errorMessage;
  if (error) {
    errorMessage = Array.isArray(error)
      ? error.map((error, index) => (
          <ErrorComponent key={index} error={error}></ErrorComponent>
        ))
      : error.message;
  }

  return error && <div className="alert alert-danger m-2">{errorMessage}</div>;
}

export default ErrorAlert;
