import {
  CustomerCarePlansCarePlans,
  CustomerCarePlansActionEnum,
  CustomerCarePlansActions,
  CustomerCarePlansDiagnosis,
} from "./CarePlans.customer.types";

// Diagnosis
export const CustomerCarePlansDiagnosisReducer = (
  state: CustomerCarePlansDiagnosis,
  action: CustomerCarePlansActions
) => {
  switch (action.type) {
    case CustomerCarePlansActionEnum.SetDiagnosisValue:
      return action.payload;

    default:
      return state;
  }
};

// CarePlans
export const CustomerCarePlansCarePlansReducer = (
  state: CustomerCarePlansCarePlans,
  action: CustomerCarePlansActions
) => {
  switch (action.type) {
    case CustomerCarePlansActionEnum.SetCarePlansValue:
      return action.payload;

    default:
      return state;
  }
};
