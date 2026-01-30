import ZoomImage from "./ZoomImage.vue";
if (typeof btoa === "undefined") {
  globalThis.btoa = (str) => Buffer.from(str, "binary").toString("base64");
}

// 支持 Vue.use()
ZoomImage.install = function (Vue) {
  Vue.component(ZoomImage.name, ZoomImage);
};

export default ZoomImage;
