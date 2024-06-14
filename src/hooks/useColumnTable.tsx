import React, { useEffect, useState } from "react";
import { Flex, Form, InputNumber, Popconfirm } from "antd";
import { CheckOutlined, EditTwoTone } from "@ant-design/icons";
import { useNotification } from "./useNotification";
import { axiosInstance } from "../interceptors/axiosInstance";
import { ColoumnsType, TableItemType } from "../types/table";

export const useColumnTable = () => {
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [data, setData] = useState<TableItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { contextHolder, openNotification } = useNotification();

  const isEditing = (record: TableItemType) => record.id === editingKey;

  const edit = (record: TableItemType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (record: TableItemType) => {
    try {
      const row = await form.validateFields();
      const response = await axiosInstance.post("/commissions/update", {
        ...record,
        ...row,
      });

      if (response.data.done) {
        openNotification("Update Successful", "success");
        const newData = [...data];
        const index = newData.findIndex((item) => record.id === item.id);
        if (index > -1) {
          const item = newData[index];
          newData[index] = {
            ...item,
            ...row,
          };
          setData(newData);
          setEditingKey(null);
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey(null);
        }
      } else {
        openNotification("Update Failed", "warning");
      }
    } catch (errInfo: any) {
      const textError = errInfo.errorFields
        .map((item: any) => item.errors[0])
        .join(",");

      openNotification(textError, "error");
    }
  };

  const columns: ColoumnsType = [
    {
      title: "دسته بندی",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "کمیسیون عادی",
      dataIndex: "commission_normal",
      key: "commission_normal",
      width: "15%",
      align: "center",
      editable: true,
      render: (_, record) => (
        <InputNumber
          defaultValue={record.commission_normal}
          addonBefore="%"
          controls={false}
          readOnly
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: "کمیسیون پروموشن",
      dataIndex: "commission_promotion",
      width: "15%",
      key: "commission_promotion",
      editable: true,
      align: "center",
      render: (_, record) => (
        <InputNumber
          defaultValue={record.commission_promotion}
          addonBefore="%"
          readOnly
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: "ویرایش",
      dataIndex: "edit",
      width: "10%",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Flex justify="center" gap={"middle"}>
            {editable ? (
              <Popconfirm title="Sure to Save?" onConfirm={() => save(record)}>
                <CheckOutlined
                  style={{ color: "rgb(140, 142, 247)", fontSize: 18 }}
                />
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Sure to Edit?"
                disabled={!!editingKey}
                onConfirm={() => edit(record)}
              >
                <EditTwoTone style={{ fontSize: 18 }} />
              </Popconfirm>
            )}
          </Flex>
        );
      },
    },
  ];

  const mergedColumns: ColoumnsType = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const getData = () => {
    setLoading(true);
    axiosInstance
      .get("/commissions")
      .then((res) => {
        const result: TableItemType[] = [];
        const tempObj: Record<string, TableItemType> = {};

        res.data.forEach((item: TableItemType) => {
          if (item.id === item.parent_id) {
            if (tempObj[item.parent_id]?.children) {
              tempObj[item.parent_id] = {
                ...item,
                children: tempObj[item.parent_id].children,
              };
            } else {
              tempObj[item.parent_id] = { ...item, children: [] };
            }
            result.push(tempObj[item.parent_id]);
          } else {
            if (!tempObj[item.parent_id]) {
              tempObj[item.parent_id] = {
                ...tempObj[item.parent_id],
                children: [item],
              };
            } else {
              tempObj[item.parent_id].children.push(item);
            }
          }
        });

        setData(result);
      })
      .catch((err) => openNotification(err.response.data.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    mergedColumns,
    loading,
    form,
    data,
    cancel,
    contextHolder,
  };
};
