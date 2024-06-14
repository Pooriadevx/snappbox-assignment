import { WebWorkerType } from "../types/common";

export const webWorker: WebWorkerType = (workerCode) => {
  let code = workerCode.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  const blob = new Blob([code], { type: "application/typescript" });
  return new Worker(URL.createObjectURL(blob));
};
