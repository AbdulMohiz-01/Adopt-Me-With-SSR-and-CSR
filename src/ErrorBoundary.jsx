import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    message: "",
  };

  //This method is a lifecycle method provided by React and is invoked when an error is thrown within any of the child components.
  static getDerivedStateFromError() {
    return {
      hasError: true,
      message: "Error has occured in the current state",
    };
  }

  // It is invoked after an error has been thrown by a child component and caught by the ErrorBoundary
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught on error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
