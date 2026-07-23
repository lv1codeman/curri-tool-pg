import { ref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle, c as VCardText, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VSelect } from './VSelect-Cq2H4SIe.mjs';
import { V as VBtn } from './VBtn-CygXX-_7.mjs';
import { V as VDivider } from './VDivider-BEUbRpXn.mjs';
import { V as VFileInput } from './VFileInput-BWTVczr1.mjs';
import { V as VSnackbar } from './VSnackbar-XEOvONhh.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'axios';
import './dimensions-B7KURZuc.mjs';
import './index-DVrSdyte.mjs';
import './autofocus-DcW6hXk9.mjs';
import './index-Cr-Vuh5O.mjs';
import './forwardRefs-CJyhXHYH.mjs';
import './VTextField-B7wWYftJ.mjs';
import './VList-7bIncbX4.mjs';
import './VListItem-BmLTdZa_.mjs';
import './ssrBoot-ZQn7gOuX.mjs';
import './VMenu-CPs0p4-G.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './VSelectionControl-CKFGRvJp.mjs';
import './VChip-F7YMK5qF.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './layout-BYmWGd6C.mjs';

const uploadUrl = "/api/upload-save";
const _sfc_main = {
  __name: "Upload",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const selectedFile = ref(null);
    const isUploading = ref(false);
    const snackbar = ref(false);
    const snackbarText = ref("");
    const snackbarColor = ref("success");
    const fileList = ref([]);
    const selectedDownloadFile = ref(null);
    const isListing = ref(false);
    async function fetchFileList() {
      isListing.value = true;
      fileList.value = [];
      selectedDownloadFile.value = null;
      try {
        const response = await $curridataAPI.get("/api/list-saves");
        let rawFiles = response.data.files || [];
        const filteredFiles = rawFiles.filter((filename) => {
          return filename.includes(".");
        });
        fileList.value = filteredFiles;
        if (fileList.value.length === 0) {
          showSnackbar("伺服器存檔目錄中沒有可供下載的檔案。", "info");
        } else if (rawFiles.length !== filteredFiles.length) {
          const excludedCount = rawFiles.length - filteredFiles.length;
          showSnackbar(
            `已成功排除 ${excludedCount} 個資料夾，僅顯示檔案。`,
            "success"
          );
        } else {
          showSnackbar(`✅ 成功載入 ${fileList.value.length} 個檔案。`, "success");
        }
      } catch (error) {
        console.error("獲取檔案列表失敗:", error);
        showSnackbar("❌ 無法載入存檔列表。", "error");
      } finally {
        isListing.value = false;
      }
    }
    function downloadFile() {
      if (!selectedDownloadFile.value) return;
      const baseURL = $curridataAPI.defaults.baseURL || (void 0).location.origin;
      const encodedFilename = encodeURIComponent(selectedDownloadFile.value);
      const downloadUrl = `${baseURL}/api/download-save/${encodedFilename}`;
      const link = (void 0).createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", selectedDownloadFile.value);
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
      showSnackbar(
        `📥 正在下載：${selectedDownloadFile.value} (下載將在瀏覽器中開始)`,
        "info"
      );
      selectedDownloadFile.value = null;
    }
    async function uploadFile() {
      if (!selectedFile.value) {
        showSnackbar("請先選擇一個檔案！", "warning");
        return;
      }
      isUploading.value = true;
      let fileToUpload = null;
      if (Array.isArray(selectedFile.value) && selectedFile.value.length > 0) {
        fileToUpload = selectedFile.value[0];
      } else if (selectedFile.value instanceof File) {
        fileToUpload = selectedFile.value;
      }
      if (!fileToUpload || !(fileToUpload instanceof File)) {
        showSnackbar("檔案物件無效！請重新選擇。", "error");
        isUploading.value = false;
        return;
      }
      const formData = new FormData();
      formData.append("file", fileToUpload);
      try {
        const response = await $curridataAPI.post(uploadUrl, formData, {
          // 修正超時問題：將 timeout 移到根層
          timeout: 12e4,
          headers: {
            // 修正 422 問題：覆寫 Content-Type 為 undefined
            "Content-Type": void 0
          }
        });
        const result = response.data;
        showSnackbar(`✅ ${result.message}`, "success");
        fetchFileList();
      } catch (error) {
        const errorDetail = error.response?.data?.detail || error.message || "未知錯誤";
        let displayMessage = `❌ 上傳失敗：${errorDetail}`;
        if (Array.isArray(errorDetail)) {
          displayMessage = `❌ 上傳失敗：伺服器驗證錯誤，請檢查檔案格式。`;
        }
        console.error("上傳失敗的錯誤物件:", error);
        showSnackbar(displayMessage, "error");
      } finally {
        isUploading.value = false;
        selectedFile.value = null;
      }
    }
    function showSnackbar(text, color) {
      snackbarText.value = text;
      snackbarColor.value = color;
      snackbar.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        class: "mx-auto pa-4",
        "max-width": "600",
        elevation: "10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "text-h5 mb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`💾 Minecraft 存檔管理`);
                } else {
                  return [
                    createTextVNode("💾 Minecraft 存檔管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`目標目錄：C:\\Users\\admin\\...\\saves`);
                } else {
                  return [
                    createTextVNode("目標目錄：C:\\Users\\admin\\...\\saves")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h6 mb-2 mt-4 pa-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`📥 下載伺服器存檔`);
                      } else {
                        return [
                          createTextVNode("📥 下載伺服器存檔")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSelect, {
                    modelValue: selectedDownloadFile.value,
                    "onUpdate:modelValue": ($event) => selectedDownloadFile.value = $event,
                    items: fileList.value,
                    label: "選擇要下載的存檔檔案 (包含副檔名)",
                    hint: "點擊右側按鈕重新整理清單",
                    "persistent-hint": "",
                    variant: "outlined",
                    density: "compact",
                    clearable: "",
                    loading: isListing.value,
                    disabled: isListing.value,
                    "item-title": "title",
                    "item-value": "value"
                  }, {
                    "append-inner": withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "mdi-refresh",
                          variant: "text",
                          size: "small",
                          onClick: fetchFileList,
                          loading: isListing.value,
                          disabled: isListing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            icon: "mdi-refresh",
                            variant: "text",
                            size: "small",
                            onClick: fetchFileList,
                            loading: isListing.value,
                            disabled: isListing.value
                          }, null, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, { class: "my-4" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h6 mb-2 pa-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`⬆️ 上傳新存檔`);
                      } else {
                        return [
                          createTextVNode("⬆️ 上傳新存檔")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VFileInput, {
                    modelValue: selectedFile.value,
                    "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                    label: "拖曳或點擊選擇存檔檔案 (.zip, 資料夾, .dat 等)",
                    hint: "同名檔案將在伺服器端被覆蓋",
                    "persistent-hint": "",
                    variant: "outlined",
                    density: "compact",
                    "prepend-icon": "mdi-cloud-upload",
                    "show-size": true,
                    counter: "",
                    chips: "",
                    clearable: "",
                    disabled: isUploading.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h6 mb-2 mt-4 pa-0" }, {
                      default: withCtx(() => [
                        createTextVNode("📥 下載伺服器存檔")
                      ]),
                      _: 1
                    }),
                    createVNode(VSelect, {
                      modelValue: selectedDownloadFile.value,
                      "onUpdate:modelValue": ($event) => selectedDownloadFile.value = $event,
                      items: fileList.value,
                      label: "選擇要下載的存檔檔案 (包含副檔名)",
                      hint: "點擊右側按鈕重新整理清單",
                      "persistent-hint": "",
                      variant: "outlined",
                      density: "compact",
                      clearable: "",
                      loading: isListing.value,
                      disabled: isListing.value,
                      "item-title": "title",
                      "item-value": "value"
                    }, {
                      "append-inner": withCtx(() => [
                        createVNode(VBtn, {
                          icon: "mdi-refresh",
                          variant: "text",
                          size: "small",
                          onClick: fetchFileList,
                          loading: isListing.value,
                          disabled: isListing.value
                        }, null, 8, ["loading", "disabled"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"]),
                    createVNode(VDivider, { class: "my-4" }),
                    createVNode(VCardTitle, { class: "text-h6 mb-2 pa-0" }, {
                      default: withCtx(() => [
                        createTextVNode("⬆️ 上傳新存檔")
                      ]),
                      _: 1
                    }),
                    createVNode(VFileInput, {
                      modelValue: selectedFile.value,
                      "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                      label: "拖曳或點擊選擇存檔檔案 (.zip, 資料夾, .dat 等)",
                      hint: "同名檔案將在伺服器端被覆蓋",
                      "persistent-hint": "",
                      variant: "outlined",
                      density: "compact",
                      "prepend-icon": "mdi-cloud-upload",
                      "show-size": true,
                      counter: "",
                      chips: "",
                      clearable: "",
                      disabled: isUploading.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardActions, { class: "d-flex justify-space-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    color: "secondary",
                    disabled: !selectedDownloadFile.value,
                    onClick: downloadFile,
                    "prepend-icon": "mdi-download",
                    size: "large",
                    variant: "tonal"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 下載選定存檔 `);
                      } else {
                        return [
                          createTextVNode(" 下載選定存檔 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    color: "primary",
                    disabled: !selectedFile.value || isUploading.value,
                    loading: isUploading.value,
                    onClick: uploadFile,
                    "append-icon": "mdi-content-save",
                    size: "large"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 上傳並儲存存檔 `);
                      } else {
                        return [
                          createTextVNode(" 上傳並儲存存檔 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      color: "secondary",
                      disabled: !selectedDownloadFile.value,
                      onClick: downloadFile,
                      "prepend-icon": "mdi-download",
                      size: "large",
                      variant: "tonal"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 下載選定存檔 ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(VBtn, {
                      color: "primary",
                      disabled: !selectedFile.value || isUploading.value,
                      loading: isUploading.value,
                      onClick: uploadFile,
                      "append-icon": "mdi-content-save",
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 上傳並儲存存檔 ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "text-h5 mb-2" }, {
                default: withCtx(() => [
                  createTextVNode("💾 Minecraft 存檔管理")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode("目標目錄：C:\\Users\\admin\\...\\saves")
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h6 mb-2 mt-4 pa-0" }, {
                    default: withCtx(() => [
                      createTextVNode("📥 下載伺服器存檔")
                    ]),
                    _: 1
                  }),
                  createVNode(VSelect, {
                    modelValue: selectedDownloadFile.value,
                    "onUpdate:modelValue": ($event) => selectedDownloadFile.value = $event,
                    items: fileList.value,
                    label: "選擇要下載的存檔檔案 (包含副檔名)",
                    hint: "點擊右側按鈕重新整理清單",
                    "persistent-hint": "",
                    variant: "outlined",
                    density: "compact",
                    clearable: "",
                    loading: isListing.value,
                    disabled: isListing.value,
                    "item-title": "title",
                    "item-value": "value"
                  }, {
                    "append-inner": withCtx(() => [
                      createVNode(VBtn, {
                        icon: "mdi-refresh",
                        variant: "text",
                        size: "small",
                        onClick: fetchFileList,
                        loading: isListing.value,
                        disabled: isListing.value
                      }, null, 8, ["loading", "disabled"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"]),
                  createVNode(VDivider, { class: "my-4" }),
                  createVNode(VCardTitle, { class: "text-h6 mb-2 pa-0" }, {
                    default: withCtx(() => [
                      createTextVNode("⬆️ 上傳新存檔")
                    ]),
                    _: 1
                  }),
                  createVNode(VFileInput, {
                    modelValue: selectedFile.value,
                    "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                    label: "拖曳或點擊選擇存檔檔案 (.zip, 資料夾, .dat 等)",
                    hint: "同名檔案將在伺服器端被覆蓋",
                    "persistent-hint": "",
                    variant: "outlined",
                    density: "compact",
                    "prepend-icon": "mdi-cloud-upload",
                    "show-size": true,
                    counter: "",
                    chips: "",
                    clearable: "",
                    disabled: isUploading.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              createVNode(VCardActions, { class: "d-flex justify-space-between" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "secondary",
                    disabled: !selectedDownloadFile.value,
                    onClick: downloadFile,
                    "prepend-icon": "mdi-download",
                    size: "large",
                    variant: "tonal"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 下載選定存檔 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(VBtn, {
                    color: "primary",
                    disabled: !selectedFile.value || isUploading.value,
                    loading: isUploading.value,
                    onClick: uploadFile,
                    "append-icon": "mdi-content-save",
                    size: "large"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 上傳並儲存存檔 ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: snackbar.value,
        "onUpdate:modelValue": ($event) => snackbar.value = $event,
        timeout: 3e3,
        color: snackbarColor.value,
        location: "bottom right"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              color: "white",
              variant: "text",
              onClick: ($event) => snackbar.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 關閉 `);
                } else {
                  return [
                    createTextVNode(" 關閉 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                color: "white",
                variant: "text",
                onClick: ($event) => snackbar.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" 關閉 ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(snackbarText.value)} `);
          } else {
            return [
              createTextVNode(toDisplayString(snackbarText.value) + " ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Sixer/Upload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Upload = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ae101dc"]]);

export { Upload as default };
//# sourceMappingURL=Upload-D-QhWqVA.mjs.map
