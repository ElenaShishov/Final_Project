import Holiday from "../models/vacation";

export class VacationState{
    public allVacations:Holiday[]=[];
}
export enum VacationActionType {
    addVacation = "addVacation",
    updateVacation = "updateVacation",
    deleteVacation = "deleteVacation",
    getVacations = "getVacations"
}
export interface VacationAction {
    type: VacationActionType;
    payload?: any;
  }
  
  export const getVacationsAction = (vacations: Holiday[]): VacationAction => {
    return {
      type: VacationActionType.getVacations,
      payload: vacations,
    };
  };
  
  export const addVacationAction = (vacation: Holiday): VacationAction => {
    return {
      type: VacationActionType.addVacation,
      payload: vacation,
    };
  };
  
  export const deleteVacationAction = (id: number): VacationAction => {
    return {
      type: VacationActionType.deleteVacation,
      payload: id,
    };
  };
  
  export const updateVacationAction = (vacation: Holiday): VacationAction => {
    return {
      type: VacationActionType.updateVacation,
      payload: vacation,
    };
  };
  
  export const vacationReducer = (
    currentState: VacationState = { allVacations: [] },
    action: VacationAction
  ): VacationState => {
    const newState = { ...currentState };
    switch (action.type) {
      case VacationActionType.getVacations:
        newState.allVacations = action.payload;
        break;
      case VacationActionType.addVacation:
        newState.allVacations = [...newState.allVacations, action.payload];
        break;
      case VacationActionType.deleteVacation:
        newState.allVacations = newState.allVacations.filter(
          (item) => item.holidayCode !== action.payload
        );
        break;
      case VacationActionType.updateVacation:
        newState.allVacations = newState.allVacations.map((item) =>
          item.holidayCode === action.payload.holidayCode? action.payload : item
        );
  
        break;
    }
    return newState;
  };