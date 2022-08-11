class CustomError extends Error {
  constructor(status, message, data) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static ValidationError(error) {
    return new CustomError(400, "Validation error", error);
  }
  static InternalServerError(error) {
    return new CustomError(500, "Internal Server Error", error);
  }
  static UnauthorizedError() {
    return new CustomError(401, "Unauthorized");
  }
  static NotFoundError() {
    return new CustomError(404, "Page Not found");
  }
}

export default CustomError;
