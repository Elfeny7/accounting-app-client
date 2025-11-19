export default class ApiError extends Error {
  constructor(message, code = 500, reason = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.reason = reason;
  }
}