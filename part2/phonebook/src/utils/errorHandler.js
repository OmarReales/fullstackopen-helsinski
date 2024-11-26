export const handleAxiosError = (error) => {
  if (error.name === "NotFoundError") {
    return "Resource not found on the server";
  }

  if (error.response) {
    if (error.response.status === 404) {
      return "Resource not found on the server";
    }
    return error.response.data?.error || "An error occurred with the server";
  }

  if (error.request) {
    return "Unable to connect to the server";
  }

  // Error in request setup
  return "An error occurred while setting up the request";
};

export const formatErrorMessage = (action, name, error) => {
  if (error.name === "NotFoundError" || error.response?.status === 404) {
    return `Information of ${name} has already been removed from server`;
  }
  return `Error ${action} ${name}: ${handleAxiosError(error)}`;
};
