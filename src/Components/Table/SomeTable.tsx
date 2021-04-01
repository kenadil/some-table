import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Column from "antd/lib/table/Column";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "../../Utils/dispatched";
import { sortID, sortUsername } from "../../Utils/sorters";
import { Link } from "react-router-dom";
import { deleteSelected } from "../../Store/Actions";
export type RecordType = {
  id: number;
  username: string;
  email: string;
  website: string;
  key: number;
};

export type StateType = {
  recordState: RecordType[];
  filterState: string;
};

const SomeTable = () => {
  const { recordState, filterState } = useSelector((state: StateType) => ({
    recordState: state.recordState,
    filterState: state.filterState,
  }));
  const userData = useSelector((state: StateType) => state.recordState);
  const dispatch = useDispatch();

  const records = getRecords(recordState, filterState, dispatch);
  records.map((e: any) => 
    e.key = e.id
  );

  const [state, setState] = useState({
    loading: true,
    selectedRowKeys: [-1],
  });

  useEffect(() => {
    let selectedKeys: number[] = state.selectedRowKeys;
    if (state.selectedRowKeys[0] === -1) {
      selectedKeys = userData[0]?.id ? [userData[0]?.id] : state.selectedRowKeys;
    }
    setState((prevState) => ({
      ...prevState,
      loading: false,
      selectedRowKeys: selectedKeys,
    }));
  }, [userData]);

  const handleDeletion = (record: any) => {
    const filteredRows = state.selectedRowKeys.filter(e => e !== record.id);
    if (records.length > 1) {
      record.onDelete();
    }
    else {
      alert("Table can't be empty!");
    }
    console.log(filteredRows);
    setState((prevState) => ({
      ...prevState,
      selectedRowKeys: filteredRows.length === 0 ? [-1] : filteredRows,
    }));
  }

  const handleMultipleDeletion = () => {
    const ids = records
      .filter((e) => state.selectedRowKeys.includes(e.key))
      .map((e) => e.id);
    if (records.filter(e => ids.indexOf(e.id) === -1).length > 0) { 
      dispatch(deleteSelected(ids));
      setState((prevState) => ({...prevState, selectedRowKeys: [-1]})); // if all records that have been selected are deleted, select the first one that remains
    }
    else {
      alert("Table can't be empty!");
    }
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys:
          selectedRowKeys[0] === -1 ? [records[0]?.id] : selectedRowKeys,
      }));
    },
  };
  return (
    <>
      {state.loading ? (
        <div>Loading</div>
      ) : (
        <Table
          pagination={{
            position: ["bottomRight", "bottomRight"],
            pageSize: 5,
          }}
          dataSource={records}
          rowSelection={rowSelection}
        >
          <Column title={<b>ID</b>} dataIndex="id" key="key" sorter={sortID} />
          <Column
            render={(record: RecordType) => (
              <Link to={`/users/${record.id}`}>
                <p>Подробнее..</p>
              </Link>
            )}
          />
          <Column
            width="20%"
            title={<b>Username</b>}
            dataIndex="username"
            sorter={sortUsername}
          />
          <Column title={<b>Email</b>} dataIndex="email" />
          <Column title={<b>Website</b>} dataIndex="website" />
          <Column
            width="12%"
            title={
              <Button type="primary" onClick={handleMultipleDeletion}>
                Delete ({state.selectedRowKeys.length})
              </Button>
            }
            render={(record: any) => (
              <Button type="default" onClick={() => handleDeletion(record)}>
                Delete
              </Button>
            )}
          />
        </Table>
      )}
    </>
  );
};

export default SomeTable;
