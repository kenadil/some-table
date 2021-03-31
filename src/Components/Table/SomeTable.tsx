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
  const dispatch = useDispatch();

  const records = getRecords(recordState, filterState, dispatch);
  records.map((e: any, index: number) => {
    e.key = index;
  });

  const [state, setState] = useState({
    loading: true,
    selectedRowKeys: [0],
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: false }));
  }, []);

  const handleMultipleDeletion = () => {
    const ids = records.filter(e => state.selectedRowKeys.includes(e.key)).map(e => e.id);
    dispatch(deleteSelected(ids));
    setState((prevState) => ({...prevState, selectedRowKeys: [0]}));
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys:
          selectedRowKeys.length === 0 ? [records[0].key] : selectedRowKeys,
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
              <Button type="default" onClick={record.onDelete}>
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
