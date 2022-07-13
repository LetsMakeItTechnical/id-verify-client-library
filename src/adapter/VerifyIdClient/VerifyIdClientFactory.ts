import { CoreAPI } from "./VerifyIdClientCredentials";
import VerifyIdClient from "./VerifyIdClient";

/**
 * VerifyId client factory
 */
export default class VerifyIdClientFactory {
  static create(): VerifyIdClient {
    return new VerifyIdClient(CoreAPI);
  }
}
