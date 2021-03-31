import { Dispatch } from "redux";
import { RecordType } from "../Components/Table/SomeTable";
import { deleteRecord } from "../Store/Actions";

export const getRecords = (
    records: RecordType[],
    filter: string,
    dispatch: Dispatch
) => {
    filter = filter.toLowerCase();
    return records
      .filter(
        (record: RecordType) =>
          filter === "" ||
          record.id.toString().includes(filter) || 
          record.username.toLowerCase().includes(filter) ||
          record.email.toLowerCase().includes(filter) ||
          record.website.toLowerCase().includes(filter)
      )
      .map((record: RecordType) => ({
        ...record,
        onDelete: () => {
          dispatch(deleteRecord(record.id));
        }, // delete multiple -> dispatch(deleteRecords(selectedRows.ids));
      }));
}