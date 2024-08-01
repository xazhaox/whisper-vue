import { Modal, message as antMessage } from "ant-design-vue";
// import { HandleData } from "./interface";

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} message 提示信息 (必传)
 * @param {String} confirmType icon类型 (不必传,默认为 warning)
 * @returns {Promise}
 */
export const useHandleData = (
  api: (params: any) => Promise<any>,
  params: any = {},
  message: string
  // confirmType: HandleData.MessageType = "warning"
) => {
  Modal.warning({
    title: "温馨提示",
    content: `是否${message}?`,
    okText: "确定",
    cancelText: "取消",
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          const res = api(params);
          if (!res) return reject(false);
          antMessage.success(`${message}成功!`);
          resolve(true);
        });
      } catch {
        // cancel operation
      }
    }
  });
};
