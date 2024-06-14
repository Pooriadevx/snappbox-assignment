import React from "react";
import { Form, Table } from "antd";
import { useColumnTable } from "../../hooks/useColumnTable";
import { EditableCell } from "../../constants/common.tsx";
import classes from "./table.module.scss";

const TableData: React.FC = () => {
  const { cancel, contextHolder, data, form, loading, mergedColumns } =
    useColumnTable();

  return (
    <>
      <Form
        form={form}
        component={false}
        style={{
          width: "100%",
        }}
      >
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={(record) => record.id}
          dataSource={data}
          columns={mergedColumns}
          rowClassName={classes.row}
          rootClassName={classes.root}
          loading={loading}
          pagination={{
            onChange: cancel,
            rootClassName: classes.rootPagination,
          }}
        />
      </Form>
      {contextHolder}
    </>
  );
};

export default TableData;
