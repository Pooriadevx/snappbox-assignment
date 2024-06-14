import React, { useCallback, useEffect, useRef, useState } from "react";
import { Flex, Form, InputNumber, notification, Popconfirm } from "antd";
import { CheckOutlined, EditTwoTone } from "@ant-design/icons";
import { axiosInstance } from "../interceptors/axiosInstance";
import { ColoumnsType, TableItemType } from "../types/table";
import worker from "../workers/app.worker.ts";
import { webWorker } from "../workers/WebWorker.ts";
import { handleError } from "../utils/errorHandler.ts";

export const useColumnTable = () => {
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [data, setData] = useState<TableItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const workerRef = useRef<Worker>();
  const memoizedWebWorker = useCallback(() => webWorker(worker), []);

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
        notification.success({
          message: "Update Successful",
        });
        const newData = [...data];

        const index = newData.findIndex(
          (item) => record.parent_id === item.parent_id
        );
        if (index > -1) {
          if (record.parent_id === record.id) {
            const item = newData[index];
            newData[index] = {
              ...item,
              ...row,
            };
          } else {
            const childrendData = newData[index].children;
            const childIndex = childrendData.findIndex(
              (item) => item.id === record.id
            );

            childrendData[childIndex] = {
              ...childrendData[childIndex],
              ...row,
            };
          }
          setData(newData);
          setEditingKey(null);
        }
      } else {
        notification.warning({
          message: "Update Failed",
        });
      }
    } catch (errInfo) {
      handleError(errInfo);
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
          style={{ width: 70 }}
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
          style={{ width: 70 }}
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
      .then((response) => {
        if (workerRef.current) {
          workerRef.current.postMessage(response.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  useEffect(() => {
    getData();
    workerRef.current = memoizedWebWorker();
    workerRef.current.addEventListener("message", (event) => {
      setData(event.data);
      setLoading(false);
    });

    return () => {
      if (workerRef.current) {
        workerRef.current.removeEventListener("message", () => setData([]));
        workerRef.current.terminate();
      }
    };
  }, []);

  return {
    mergedColumns,
    loading,
    form,
    data,
    cancel,
  };
};
