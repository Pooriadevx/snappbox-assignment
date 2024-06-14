import React from "react";
import { ConfigProvider, Form, Table } from "antd";
import { useColumnTable } from "../../hooks/useColumnTable";
import { EditableCell } from "../../constants/common.tsx";
import { CustomThemeConfig } from "../../constants/common.ts";
import classes from "./table.module.scss";

const TableData: React.FC = () => {
  const { cancel, data, form, loading, mergedColumns } = useColumnTable();

  return (
    <ConfigProvider theme={CustomThemeConfig}>
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
    </ConfigProvider>
  );
};

export default TableData;
