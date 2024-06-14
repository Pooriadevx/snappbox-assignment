import { TableItemType } from "../types/table";

export default () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.addEventListener("message", (e) => {
    if (!e) return;
    const result: TableItemType[] = [];
    const tempObj: Record<string, TableItemType> = {};

    e.data.forEach((item: TableItemType) => {
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

    postMessage(result);
  });
};
