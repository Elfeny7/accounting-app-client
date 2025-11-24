export default class ApiError extends Error {
  constructor(message, code = 500, error = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.error = error;
  }
}