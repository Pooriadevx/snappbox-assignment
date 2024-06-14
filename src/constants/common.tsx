import React from "react";
import { EditableCellProps } from "../types/table";
import { Form, InputNumber } from "antd";

export const EditableCell: React.FC<
  React.PropsWithChildren<EditableCellProps>
> = ({ editing, dataIndex, title, record, index, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `فیلد ${title}  خالی است.`,
            },
          ]}
        >
          <InputNumber
            controls={false}
            maxLength={3}
            max={100}
            addonBefore="%"
            style={{ width: 70 }}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
