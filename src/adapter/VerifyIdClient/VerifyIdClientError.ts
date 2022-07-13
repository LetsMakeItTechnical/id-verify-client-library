export default class VerifyIdClientError extends Error {
  /**
   * MySql client error constructor
   * @param message
   */
  constructor(message: string) {
    super(message);
  }
}
