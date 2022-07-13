//@ts-ignore
export { CoreAPI } from "idanalyzer";

export const API_KEY = {
  DEFAULT: process?.env?.DEFAULT_API_KEY,
}

export enum REGION {
  EU = "EU",
  US = "US",
}

export interface VerificationResult {
  person: ScannedDocs["result"];
  is_verified_id: boolean;
  isIdentical: boolean;
}

export interface Result {
  documentNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  sex: string;
  age: number;
  dob: string;
  dob_day: number;
  dob_month: number;
  dob_year: number;
  expiry: string;
  expiry_day: number;
  expiry_month: number;
  expiry_year: number;
  daysToExpiry: number;
  issued: string;
  issued_day: number;
  issued_month: number;
  issued_year: number;
  daysFromIssue: number;
  placeOfBirth: string;
  documentType: string;
  documentSide: string;
  issueAuthority: string;
  issuerOrg_full: string;
  issuerOrg_iso2: string;
  issuerOrg_iso3: string;
  nationality_full: string;
  nationality_iso2: string;
  nationality_iso3: string;
  internalId: string;
}

export interface ScannedDocs {
  result: Result;
  face: {
    isIdentical: boolean;
    confidence: string;
  };
  verification: {
    passed: boolean;
    result: {
      face: boolean;
      notexpired: boolean;
    };
  };
  outputface: string;
  authentication: {
    score: number;
  };
  aml: any[];
  contract: Record<string, any>;
  vaultid: string;
  matchrate: number;
  executionTime: number;
  responseID: string;
  quota: number;
  credit: number;
}
