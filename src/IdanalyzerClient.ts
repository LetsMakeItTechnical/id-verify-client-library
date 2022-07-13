export default interface IdanalyzerClient<T, U> {
  readonly CoreAPI: T;
  idVerification(params: IDVerificationParams): Promise<U>;
}

export interface IDVerificationParams {
  document_primary: string;
  document_secondary?: string;
  biometric_photo?: string;
  biometric_video?: string;
}