import { RecordType } from "../../Components/Table/SomeTable";
import {
  DELETE_MULTIPLE,
  DELETE_RECORD,
  FETCH_RECORDS,
} from "../Actions/ActionTypes";

const recordReducer = (state: RecordType[] = [], action: any) => {
  switch (action.type) {
    case DELETE_RECORD:
      return state.filter((record: RecordType) => record.id !== action.id);
    case DELETE_MULTIPLE:
      return state.filter(
        (record: RecordType) => action.ids.indexOf(record) !== -1
      );
    case FETCH_RECORDS:
      return action.records;
    default:
      return state;
  }
};

export default recordReducer;
