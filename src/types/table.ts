import { ColumnType } from "antd/es/table";

export type TableItemType = {
  commission_normal: number;
  commission_normal_new: number;
  commission_promotion: number;
  commission_promotion_new: number;
  parent_id: number;
  id: number;
  name: string;
  children: TableItemType[];
};

export type EditableCellProps = React.HTMLAttributes<HTMLElement> & {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: TableItemType;
  index: number;
};

export type dataType = {
  title: string;
  editable?: boolean;
};

export type ColoumnsType = (ColumnType<TableItemType> & dataType)[];
