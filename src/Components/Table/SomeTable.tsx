import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Column from "antd/lib/table/Column";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "../../Utils/dispatched";
import { sortID, sortUsername } from "../../Utils/sorters";

export type RecordType = {
  id: number;
  username: string;
  email: string;
  website: string;
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

  const [state, setState] = useState({
    loading: true,
    selectedRowKeys: [1],
  });


  const records = getRecords(recordState, filterState, dispatch);
  records.map((e: any) => {e.key=e.id})

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: false }));
  }, []);

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys: selectedRowKeys.length === 0 ? [1] : selectedRowKeys,
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
          <Column render={(record: any) => <a>Подробнее..</a>} />
          <Column
            title={<b>Username</b>}
            dataIndex="username"
            sorter={sortUsername}
          />
          <Column title={<b>Email</b>} dataIndex="email" />
          <Column title={<b>Website</b>} dataIndex="website" />
          <Column
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
