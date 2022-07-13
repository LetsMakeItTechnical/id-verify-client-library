import IdanalyzerClient, { IDVerificationParams } from "../../IdanalyzerClient";

import {
  API_KEY,
  ScannedDocs,
  REGION,
  CoreAPI,
  VerificationResult,
} from "./VerifyIdClientCredentials";

import VerifyIdClientError from "./VerifyIdClientError";

export default class VerifyIdClient implements IdanalyzerClient<CoreAPI, any> {
  readonly CoreAPI: CoreAPI;

  constructor(CoreAPI: CoreAPI) {
    this.CoreAPI = new CoreAPI(API_KEY.DEFAULT, REGION.EU);
    this.CoreAPI.enableAuthentication(true, 2);
    this.CoreAPI.verifyExpiry(true);
    this.CoreAPI.enableAMLCheck(true);
  }

  private parseDocumentVerification(
    authenticationResult: ScannedDocs["authentication"],
    response: VerificationResult
  ) {
    // Parse document authentication results
    if (authenticationResult) {
      if (authenticationResult["score"] > 0.5) {
        console.log("The document uploaded is authentic");
        response["is_verified_id"] = true;
      } else if (authenticationResult["score"] >= 0.4) {
        console.log("The document uploaded looks little bit suspicious");
        response["is_verified_id"] = true;
      } else {
        console.log("The document uploaded is fake");
      }
    }
  }

  private parseBiometricVerification(
    faceResult: ScannedDocs["face"],
    response: VerificationResult
  ) {
    // Parse biometric verification results
    if (faceResult) {
      if (faceResult["isIdentical"]) {
        console.log("Biometric verification PASSED!");
        response["isIdentical"] = faceResult["isIdentical"];
      } else {
        console.log("Biometric verification FAILED!");
      }
      console.log("Confidence Score: " + faceResult["confidence"]);
    }
  }

  private handlePayload(params: IDVerificationParams) {
    const payload = {} as IDVerificationParams;

    if (params.document_secondary) {
      payload.document_secondary = params?.document_secondary;
    } else if (params?.biometric_photo) {
      payload.biometric_photo = params?.biometric_photo;
    } else if (params?.biometric_video) {
      payload.biometric_video = params?.biometric_video;
    }

    payload.document_primary = params.document_primary;
    return payload;
  }

  private handleScannedDocs(scannedDoc: ScannedDocs) {
    // All the information about this ID will be returned in an associative array
    const dataResult = scannedDoc["result"];
    const authenticationResult = scannedDoc["authentication"];
    const faceResult = scannedDoc["face"];

    const response = {
      person: dataResult,
      is_verified_id: false,
      isIdentical: false,
    } as VerificationResult;

    // Parse document authentication results
    this.parseDocumentVerification(authenticationResult, response);

    // Parse biometric verification results
    this.parseBiometricVerification(faceResult, response);

    return response;
  }

  async idVerification(params: IDVerificationParams) {
    try {
      if (!params?.document_primary) {
        throw new VerifyIdClientError("Primary document image required.");
      }

      const payload = this.handlePayload(params);
      const scannedDoc: ScannedDocs = await this.CoreAPI.scan(payload);

      return this.handleScannedDocs(scannedDoc);
    } catch (err) {
      const error = err as any;
      const verifyIdClientError = new VerifyIdClientError(error.message);
      console.error(verifyIdClientError.message, verifyIdClientError);
      throw verifyIdClientError;
    }
  }
}
