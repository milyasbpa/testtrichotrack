type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface CustomerCarePlansInitialStateType {
  diagnosis: CustomerCarePlansDiagnosis;
  careplans: CustomerCarePlansCarePlans;
}

// State Collection Types consist of:
export interface CustomerCarePlansDiagnosis {
  overview: {
    data: null | {
      name: string;
      rating: number;
      level: string;
    };
  };
}

export interface CustomerCarePlansCarePlans {
  procedure: {
    selected: null | { id: string; name: string };
  };
  data: null | {
    id: number;
    name: string;
    description: string;
    photo: string;
    procedures: {
      [key: string]: {
        name: string;
        description: string;
        photo: string;
      };
    };
    schedule: string;
  };
}

export enum CustomerCarePlansActionEnum {
  // diagnosis
  SetDiagnosisValue = "SetDiagnosisValue",
  // careplans
  SetCarePlansValue = "SetCarePlansValue",
}

// Action Collection Types
export type CustomerCarePlansActions =
  | CustomerCarePlansDiagnosisActions
  | CustomerCarePlansCarePlansActions;

// Action Collection Types consist of:

// Diagnosis
type CustomerCarePlansDiagnosisPayload = {
  [CustomerCarePlansActionEnum.SetDiagnosisValue]: CustomerCarePlansDiagnosis;
};

export type CustomerCarePlansDiagnosisActions =
  ActionMap<CustomerCarePlansDiagnosisPayload>[keyof ActionMap<CustomerCarePlansDiagnosisPayload>];

// CarePlans
type CustomerCarePlansCarePlansPayload = {
  [CustomerCarePlansActionEnum.SetCarePlansValue]: CustomerCarePlansCarePlans;
};

export type CustomerCarePlansCarePlansActions =
  ActionMap<CustomerCarePlansCarePlansPayload>[keyof ActionMap<CustomerCarePlansCarePlansPayload>];
