import { RecordType } from "../Components/Table/SomeTable";

export const sortUsername = {
    compare: (a: RecordType, b: RecordType) => a.username.localeCompare(b.username),
    multiple: 1,
};

export const sortID = {
    compare: (a: RecordType, b: RecordType) => a.id - b.id,
    multiple: 1,
};