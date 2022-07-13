import { VError } from "verror";

export default class TimeoutError extends VError {
  name = "TimeoutError";
}
