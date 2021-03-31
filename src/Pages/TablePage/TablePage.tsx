import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SomeTable from "../../Components/Table/SomeTable";
import { fetchRecords, setFilter } from "../../Store/Actions";
import { isEqual } from "lodash";
import { store } from "../../Store/store";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TablePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecords());
    let state = store.getState();
    store.subscribe(() => {
      let newState = store.getState();
      if (!isEqual(state.recordState, newState.recordState)) {
        dispatch(fetchRecords);
      }
      state = newState;
    });
  }, [dispatch]);
  return (
    <>
      <Input
         prefix={<SearchOutlined className="site-form-item-icon" />}
         placeholder={"Search by keywords"}
         onChange={(e) => dispatch(setFilter(e.target.value))}
         style={{
           marginBottom: "2vh",
         }}
         allowClear
      />
      <SomeTable />
    </>
  );
};

export default TablePage;
