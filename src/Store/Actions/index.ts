import { Dispatch } from "redux";
import { fetchRecordsAPI } from "../../Services";
import { DELETE_MULTIPLE, DELETE_RECORD, FETCH_RECORDS, SET_FILTER } from "./ActionTypes";

export const fetchRecords = () => (dispatch: Dispatch) => {
    fetchRecordsAPI()
        .then((records) => dispatch({ type: FETCH_RECORDS, records}))
        .catch((error) => console.log(error));
}

export const deleteRecord = (id: number) => ({
    type: DELETE_RECORD,
    id,
});

export const deleteSelected = (ids: any[]) => ({
    type: DELETE_MULTIPLE,
    ids,
});

export const setFilter = (filter: string) => ({
    type: SET_FILTER,
    filter,
})