import { ref, computed, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useId, mergeProps, createElementVNode, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp, M as useRuntimeConfig, g as genericComponent, c as useProxiedModel, f as filterInputAttrs, p as propsFactory, I as IconValue, o as omit } from './server.mjs';
import { V as VApp } from './VApp-TyFvARlZ.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle, c as VCardText } from './VCard-BqUhiF6T.mjs';
import { V as VAlert } from './VAlert-jyf7tndU.mjs';
import { V as VTextField } from './VTextField-B7wWYftJ.mjs';
import { V as VInput, f as VLabel, c as makeVInputProps } from './autofocus-DcW6hXk9.mjs';
import { V as VSelectionControl, a as VSelectionControlGroup, m as makeSelectionControlGroupProps, b as makeVSelectionControlProps } from './VSelectionControl-CKFGRvJp.mjs';
import { f as forwardRefs } from './forwardRefs-CJyhXHYH.mjs';
import { u as useRender } from './dimensions-B7KURZuc.mjs';
import { V as VChip } from './VChip-F7YMK5qF.mjs';
import { a as VProgressLinear, V as VIcon } from './index-DVrSdyte.mjs';
import { V as VBtn } from './VBtn-CygXX-_7.mjs';
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
import './layout-BYmWGd6C.mjs';
import './index-Cr-Vuh5O.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const makeVRadioProps = propsFactory({
  ...makeVSelectionControlProps({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio");
const VRadio = genericComponent()({
  name: "VRadio",
  props: makeVRadioProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const controlProps = VSelectionControl.filterProps(props);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "class": ["v-radio", props.class],
        "style": props.style,
        "type": "radio"
      }), slots);
    });
    return {};
  }
});
const makeVRadioGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...omit(makeVInputProps(), ["direction"]),
  ...omit(makeSelectionControlGroupProps(), ["multiple"]),
  trueIcon: {
    type: IconValue,
    default: "$radioOn"
  },
  falseIcon: {
    type: IconValue,
    default: "$radioOff"
  },
  type: {
    type: String,
    default: "radio"
  }
}, "VRadioGroup");
const VRadioGroup = genericComponent()({
  name: "VRadioGroup",
  inheritAttrs: false,
  props: makeVRadioGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `radio-group-${uid}`);
    const model = useProxiedModel(props, "modelValue");
    const inputRef = ref();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const controlProps = VSelectionControl.filterProps(props);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ["v-radio-group", props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly
          } = _ref2;
          return createElementVNode(Fragment, null, [label && createVNode(VLabel, {
            "id": id2.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "defaultsTarget": "VRadio",
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "aria-labelledby": label ? id2.value : void 0,
            "multiple": false
          }, controlAttrs, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event
          }), slots)]);
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});
const _sfc_main = {
  __name: "YTconverter",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const BASE_DOWNLOAD_URL = config.public.apiBaseUrl;
    const url = ref("");
    const format = ref("mp3");
    const error = ref("");
    const message = ref("");
    const jobId = ref(null);
    const status = ref("IDLE");
    const progress = ref(0);
    const pollingInterval = ref(null);
    const { $curridataAPI } = useNuxtApp();
    const statusColor = computed(function() {
      return status.value === "PENDING" || status.value === "DOWNLOADING" ? "primary" : status.value === "COMPLETED" ? "success" : status.value === "FAILED" || status.value === "ERROR" ? "error" : "grey";
    });
    const statusText = computed(function() {
      return status.value === "PENDING" ? "等待伺服器處理..." : status.value === "DOWNLOADING" ? `下載中... (${progress.value.toFixed(1)}%)` : status.value === "COMPLETED" ? "下載完成！" : status.value === "FAILED" ? "任務失敗！" : status.value === "ERROR" ? "連線/輪詢錯誤" : "準備就緒";
    });
    const isProcessing = computed(function() {
      return status.value === "PENDING" || status.value === "DOWNLOADING";
    });
    const downloadMedia = async function() {
      error.value = "";
      message.value = "";
      stopPolling();
      if (!url.value.trim() || !url.value.startsWith("http")) {
        error.value = "請輸入有效的 YouTube 網址，並確保它以 http 或 https 開頭。";
        return;
      }
      status.value = "PENDING";
      progress.value = 0;
      jobId.value = null;
      message.value = "正在提交下載任務...";
      try {
        const gopost = JSON.stringify({ url: url.value, format: format.value });
        const response = await $curridataAPI.post("submit_download_job", gopost);
        const data = response.data;
        let receivedJobId = data.job_id || data.id || data.taskId;
        if (!receivedJobId) {
          if (data.error || data.message) {
            throw new Error(`伺服器回傳錯誤: ${data.error || data.message}`);
          }
          throw new Error(
            `伺服器回傳格式錯誤，找不到 job_id、id 或 taskId。實際回傳資料：${JSON.stringify(
              response
            )}`
          );
        }
        jobId.value = receivedJobId;
        message.value = `任務已成功提交，Job ID: ${jobId.value}。開始追蹤進度...`;
        startPolling();
      } catch (err) {
        console.error("提交任務失敗:", err);
        let errorMessage = err.message || (typeof err === "object" && err !== null ? JSON.stringify(err) : String(err));
        error.value = `提交任務失敗：${errorMessage}`;
        status.value = "FAILED";
      }
    };
    const startPolling = function() {
      stopPolling();
      checkStatus();
      pollingInterval.value = setInterval();
    };
    const stopPolling = function() {
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
      }
    };
    const checkStatus = async function() {
      if (!jobId.value) {
        stopPolling();
        return;
      }
      try {
        const response = await $curridataAPI.get(`download_status/${jobId.value}`);
        const data = response.data;
        if (!data.status) {
          throw new Error("伺服器回傳狀態格式錯誤。");
        }
        status.value = data.status;
        progress.value = data.progress || 0;
        if (status.value === "COMPLETED") {
          stopPolling();
          message.value = `✅ 下載完成 (100%)！檔案已在伺服器準備完畢。正在啟動下載...`;
          triggerDownload();
        } else if (status.value === "DOWNLOADING") {
          message.value = `下載中，進度更新至 ${progress.value.toFixed(1)}%...`;
        } else if (status.value === "FAILED") {
          stopPolling();
          error.value = `❌ 任務處理失敗。請檢查網址或伺服器日誌。`;
        }
      } catch (err) {
        console.error("輪詢錯誤:", err);
        stopPolling();
        status.value = "ERROR";
        let errorMessage = err.message || (typeof err === "object" && err !== null ? JSON.stringify(err) : String(err));
        error.value = `輪詢狀態錯誤：${errorMessage}`;
      }
    };
    const triggerDownload = function() {
      if (jobId.value && status.value === "COMPLETED") {
        const downloadUrl = `${BASE_DOWNLOAD_URL}/download_file/${jobId.value}`;
        const link = (void 0).createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          `media_download_${jobId.value}.${format.value}`
        );
        link.style.display = "none";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
        message.value = `🎉 檔案下載已開始。瀏覽器將提示您儲存位置。`;
        setTimeout(function() {
          status.value = "IDLE";
          progress.value = 0;
          jobId.value = null;
        }, 3e3);
      }
    };
    const handleSubmit = function() {
      if (status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR") {
        downloadMedia();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { fluid: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, {
                    justify: "center",
                    align: "start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "10",
                          md: "8",
                          lg: "6",
                          xl: "5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, {
                                class: "pa-4 pa-sm-8",
                                elevation: "12",
                                rounded: "xl"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` YouTube下載器 `);
                                        } else {
                                          return [
                                            createTextVNode(" YouTube下載器 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardSubtitle, { class: "text-center mb-6" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p data-v-5ab031ce${_scopeId6}>輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。</p><p data-v-5ab031ce${_scopeId6}>例如：https://www.youtube.com/watch?v=JfYbYIv2-tY</p>`);
                                        } else {
                                          return [
                                            createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                            createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    if (error.value) {
                                      _push6(ssrRenderComponent(VAlert, {
                                        type: "error",
                                        closable: "",
                                        icon: "mdi-alert-circle",
                                        variant: "tonal",
                                        class: "mb-4",
                                        "onUpdate:modelValue": ($event) => error.value = ""
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="font-weight-medium" data-v-5ab031ce${_scopeId6}>錯誤:</div> ${ssrInterpolate(error.value)}`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                              createTextVNode(" " + toDisplayString(error.value), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    if (message.value && status.value !== "COMPLETED") {
                                      _push6(ssrRenderComponent(VAlert, {
                                        type: "info",
                                        icon: "mdi-information-outline",
                                        variant: "tonal",
                                        class: "mb-4"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="font-weight-medium" data-v-5ab031ce${_scopeId6}>狀態:</div> ${ssrInterpolate(message.value)}`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                              createTextVNode(" " + toDisplayString(message.value), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    if (status.value === "COMPLETED") {
                                      _push6(ssrRenderComponent(VAlert, {
                                        type: "success",
                                        icon: "mdi-check-all",
                                        variant: "tonal",
                                        class: "mb-4",
                                        "onUpdate:modelValue": ($event) => message.value = ""
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="font-weight-medium" data-v-5ab031ce${_scopeId6}>下載已完成!</div> ${ssrInterpolate(message.value)}`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                              createTextVNode(" " + toDisplayString(message.value), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: url.value,
                                      "onUpdate:modelValue": ($event) => url.value = $event,
                                      label: "YouTube 影片網址",
                                      placeholder: "例如: https://www.youtube.com/watch?v=...",
                                      variant: "outlined",
                                      disabled: isProcessing.value,
                                      rules: [(v) => !!v || "網址不能為空"],
                                      "prepend-inner-icon": "mdi-link-variant",
                                      clearable: "",
                                      class: "mb-6"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VRadioGroup, {
                                      modelValue: format.value,
                                      "onUpdate:modelValue": ($event) => format.value = $event,
                                      label: "選擇輸出格式",
                                      inline: "",
                                      disabled: isProcessing.value,
                                      class: "mb-8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "MP3 (音訊)",
                                            value: "mp3",
                                            color: "primary",
                                            icon: "mdi-music-box",
                                            class: "mr-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "MP4 (影片)",
                                            value: "mp4",
                                            color: "primary",
                                            icon: "mdi-video",
                                            class: "mr-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "MP3 (音訊)",
                                              value: "mp3",
                                              color: "primary",
                                              icon: "mdi-music-box",
                                              class: "mr-4"
                                            }),
                                            createVNode(VRadio, {
                                              label: "MP4 (影片)",
                                              value: "mp4",
                                              color: "primary",
                                              icon: "mdi-video",
                                              class: "mr-4"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    if (jobId.value) {
                                      _push6(ssrRenderComponent(VCard, {
                                        loading: isProcessing.value,
                                        color: statusColor.value,
                                        variant: "tonal",
                                        class: "mb-6 pa-4"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="d-flex justify-space-between align-center mb-2" data-v-5ab031ce${_scopeId6}><span class="text-subtitle-1 font-weight-medium" data-v-5ab031ce${_scopeId6}>任務 ID:</span>`);
                                            _push7(ssrRenderComponent(VChip, {
                                              color: statusColor.value,
                                              variant: "flat",
                                              size: "small"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(jobId.value)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(jobId.value), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="d-flex justify-space-between align-center mb-4" data-v-5ab031ce${_scopeId6}><span class="text-subtitle-1 font-weight-medium" data-v-5ab031ce${_scopeId6}>目前狀態:</span>`);
                                            _push7(ssrRenderComponent(VChip, {
                                              color: statusColor.value,
                                              variant: "outlined",
                                              size: "default"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(statusText.value)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(statusText.value), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`</div>`);
                                            _push7(ssrRenderComponent(VProgressLinear, {
                                              modelValue: progress.value,
                                              "onUpdate:modelValue": ($event) => progress.value = $event,
                                              color: statusColor.value,
                                              height: "16",
                                              rounded: "",
                                              striped: "",
                                              class: "my-2"
                                            }, {
                                              default: withCtx(({ value }, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<span class="text-white font-weight-bold text-caption" data-v-5ab031ce${_scopeId7}>${ssrInterpolate(value.toFixed(1))}% </span>`);
                                                } else {
                                                  return [
                                                    createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                                createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                                createVNode(VChip, {
                                                  color: statusColor.value,
                                                  variant: "flat",
                                                  size: "small"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(jobId.value), 1)
                                                  ]),
                                                  _: 1
                                                }, 8, ["color"])
                                              ]),
                                              createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                                createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                                createVNode(VChip, {
                                                  color: statusColor.value,
                                                  variant: "outlined",
                                                  size: "default"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(statusText.value), 1)
                                                  ]),
                                                  _: 1
                                                }, 8, ["color"])
                                              ]),
                                              createVNode(VProgressLinear, {
                                                modelValue: progress.value,
                                                "onUpdate:modelValue": ($event) => progress.value = $event,
                                                color: statusColor.value,
                                                height: "16",
                                                rounded: "",
                                                striped: "",
                                                class: "my-2"
                                              }, {
                                                default: withCtx(({ value }) => [
                                                  createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(VBtn, {
                                      onClick: handleSubmit,
                                      loading: isProcessing.value,
                                      disabled: isProcessing.value,
                                      color: isProcessing.value ? "primary" : "success",
                                      size: "x-large",
                                      block: "",
                                      elevation: "8",
                                      rounded: "lg",
                                      class: "text-button"
                                    }, {
                                      loader: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="custom-loader" data-v-5ab031ce${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VIcon, {
                                            icon: "mdi-cached",
                                            class: "spin-icon"
                                          }, null, _parent7, _scopeId6));
                                          _push7(` 處理中... </span>`);
                                        } else {
                                          return [
                                            createVNode("span", { class: "custom-loader" }, [
                                              createVNode(VIcon, {
                                                icon: "mdi-cached",
                                                class: "spin-icon"
                                              }),
                                              createTextVNode(" 處理中... ")
                                            ])
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR") {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>開始下載</span>`);
                                          } else if (status.value === "COMPLETED") {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>下載完成 (點擊即可重新提交)</span>`);
                                          } else if (status.value === "PENDING") {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>提交中...</span>`);
                                          } else if (status.value === "DOWNLOADING") {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>${ssrInterpolate(statusText.value)}</span>`);
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                        } else {
                                          return [
                                            status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` **備註:** `);
                                          if (isProcessing.value) {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>伺服器正在背景處理您的請求。請不要關閉頁面。</span>`);
                                          } else {
                                            _push7(`<span data-v-5ab031ce${_scopeId6}>下載時間取決於伺服器處理速度與檔案大小。</span>`);
                                          }
                                        } else {
                                          return [
                                            createTextVNode(" **備註:** "),
                                            isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" YouTube下載器 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardSubtitle, { class: "text-center mb-6" }, {
                                        default: withCtx(() => [
                                          createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                          createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                        ]),
                                        _: 1
                                      }),
                                      error.value ? (openBlock(), createBlock(VAlert, {
                                        key: 0,
                                        type: "error",
                                        closable: "",
                                        icon: "mdi-alert-circle",
                                        variant: "tonal",
                                        class: "mb-4",
                                        "onUpdate:modelValue": ($event) => error.value = ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                          createTextVNode(" " + toDisplayString(error.value), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                      message.value && status.value !== "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                        key: 1,
                                        type: "info",
                                        icon: "mdi-information-outline",
                                        variant: "tonal",
                                        class: "mb-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                          createTextVNode(" " + toDisplayString(message.value), 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      status.value === "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                        key: 2,
                                        type: "success",
                                        icon: "mdi-check-all",
                                        variant: "tonal",
                                        class: "mb-4",
                                        "onUpdate:modelValue": ($event) => message.value = ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                          createTextVNode(" " + toDisplayString(message.value), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                      createVNode(VTextField, {
                                        modelValue: url.value,
                                        "onUpdate:modelValue": ($event) => url.value = $event,
                                        label: "YouTube 影片網址",
                                        placeholder: "例如: https://www.youtube.com/watch?v=...",
                                        variant: "outlined",
                                        disabled: isProcessing.value,
                                        rules: [(v) => !!v || "網址不能為空"],
                                        "prepend-inner-icon": "mdi-link-variant",
                                        clearable: "",
                                        class: "mb-6"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "rules"]),
                                      createVNode(VRadioGroup, {
                                        modelValue: format.value,
                                        "onUpdate:modelValue": ($event) => format.value = $event,
                                        label: "選擇輸出格式",
                                        inline: "",
                                        disabled: isProcessing.value,
                                        class: "mb-8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "MP3 (音訊)",
                                            value: "mp3",
                                            color: "primary",
                                            icon: "mdi-music-box",
                                            class: "mr-4"
                                          }),
                                          createVNode(VRadio, {
                                            label: "MP4 (影片)",
                                            value: "mp4",
                                            color: "primary",
                                            icon: "mdi-video",
                                            class: "mr-4"
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                      jobId.value ? (openBlock(), createBlock(VCard, {
                                        key: 3,
                                        loading: isProcessing.value,
                                        color: statusColor.value,
                                        variant: "tonal",
                                        class: "mb-6 pa-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                            createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                            createVNode(VChip, {
                                              color: statusColor.value,
                                              variant: "flat",
                                              size: "small"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(jobId.value), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["color"])
                                          ]),
                                          createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                            createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                            createVNode(VChip, {
                                              color: statusColor.value,
                                              variant: "outlined",
                                              size: "default"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(statusText.value), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["color"])
                                          ]),
                                          createVNode(VProgressLinear, {
                                            modelValue: progress.value,
                                            "onUpdate:modelValue": ($event) => progress.value = $event,
                                            color: statusColor.value,
                                            height: "16",
                                            rounded: "",
                                            striped: "",
                                            class: "my-2"
                                          }, {
                                            default: withCtx(({ value }) => [
                                              createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "color"])) : createCommentVNode("", true),
                                      createVNode(VBtn, {
                                        onClick: handleSubmit,
                                        loading: isProcessing.value,
                                        disabled: isProcessing.value,
                                        color: isProcessing.value ? "primary" : "success",
                                        size: "x-large",
                                        block: "",
                                        elevation: "8",
                                        rounded: "lg",
                                        class: "text-button"
                                      }, {
                                        loader: withCtx(() => [
                                          createVNode("span", { class: "custom-loader" }, [
                                            createVNode(VIcon, {
                                              icon: "mdi-cached",
                                              class: "spin-icon"
                                            }),
                                            createTextVNode(" 處理中... ")
                                          ])
                                        ]),
                                        default: withCtx(() => [
                                          status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled", "color"]),
                                      createVNode(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" **備註:** "),
                                          isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, {
                                  class: "pa-4 pa-sm-8",
                                  elevation: "12",
                                  rounded: "xl"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" YouTube下載器 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardSubtitle, { class: "text-center mb-6" }, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                        createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                      ]),
                                      _: 1
                                    }),
                                    error.value ? (openBlock(), createBlock(VAlert, {
                                      key: 0,
                                      type: "error",
                                      closable: "",
                                      icon: "mdi-alert-circle",
                                      variant: "tonal",
                                      class: "mb-4",
                                      "onUpdate:modelValue": ($event) => error.value = ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                        createTextVNode(" " + toDisplayString(error.value), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                    message.value && status.value !== "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                      key: 1,
                                      type: "info",
                                      icon: "mdi-information-outline",
                                      variant: "tonal",
                                      class: "mb-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                        createTextVNode(" " + toDisplayString(message.value), 1)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    status.value === "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                      key: 2,
                                      type: "success",
                                      icon: "mdi-check-all",
                                      variant: "tonal",
                                      class: "mb-4",
                                      "onUpdate:modelValue": ($event) => message.value = ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                        createTextVNode(" " + toDisplayString(message.value), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                    createVNode(VTextField, {
                                      modelValue: url.value,
                                      "onUpdate:modelValue": ($event) => url.value = $event,
                                      label: "YouTube 影片網址",
                                      placeholder: "例如: https://www.youtube.com/watch?v=...",
                                      variant: "outlined",
                                      disabled: isProcessing.value,
                                      rules: [(v) => !!v || "網址不能為空"],
                                      "prepend-inner-icon": "mdi-link-variant",
                                      clearable: "",
                                      class: "mb-6"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "rules"]),
                                    createVNode(VRadioGroup, {
                                      modelValue: format.value,
                                      "onUpdate:modelValue": ($event) => format.value = $event,
                                      label: "選擇輸出格式",
                                      inline: "",
                                      disabled: isProcessing.value,
                                      class: "mb-8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "MP3 (音訊)",
                                          value: "mp3",
                                          color: "primary",
                                          icon: "mdi-music-box",
                                          class: "mr-4"
                                        }),
                                        createVNode(VRadio, {
                                          label: "MP4 (影片)",
                                          value: "mp4",
                                          color: "primary",
                                          icon: "mdi-video",
                                          class: "mr-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                    jobId.value ? (openBlock(), createBlock(VCard, {
                                      key: 3,
                                      loading: isProcessing.value,
                                      color: statusColor.value,
                                      variant: "tonal",
                                      class: "mb-6 pa-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                          createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                          createVNode(VChip, {
                                            color: statusColor.value,
                                            variant: "flat",
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(jobId.value), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["color"])
                                        ]),
                                        createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                          createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                          createVNode(VChip, {
                                            color: statusColor.value,
                                            variant: "outlined",
                                            size: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(statusText.value), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["color"])
                                        ]),
                                        createVNode(VProgressLinear, {
                                          modelValue: progress.value,
                                          "onUpdate:modelValue": ($event) => progress.value = $event,
                                          color: statusColor.value,
                                          height: "16",
                                          rounded: "",
                                          striped: "",
                                          class: "my-2"
                                        }, {
                                          default: withCtx(({ value }) => [
                                            createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "color"])) : createCommentVNode("", true),
                                    createVNode(VBtn, {
                                      onClick: handleSubmit,
                                      loading: isProcessing.value,
                                      disabled: isProcessing.value,
                                      color: isProcessing.value ? "primary" : "success",
                                      size: "x-large",
                                      block: "",
                                      elevation: "8",
                                      rounded: "lg",
                                      class: "text-button"
                                    }, {
                                      loader: withCtx(() => [
                                        createVNode("span", { class: "custom-loader" }, [
                                          createVNode(VIcon, {
                                            icon: "mdi-cached",
                                            class: "spin-icon"
                                          }),
                                          createTextVNode(" 處理中... ")
                                        ])
                                      ]),
                                      default: withCtx(() => [
                                        status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled", "color"]),
                                    createVNode(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" **備註:** "),
                                        isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "10",
                            md: "8",
                            lg: "6",
                            xl: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                class: "pa-4 pa-sm-8",
                                elevation: "12",
                                rounded: "xl"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" YouTube下載器 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardSubtitle, { class: "text-center mb-6" }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                      createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                    ]),
                                    _: 1
                                  }),
                                  error.value ? (openBlock(), createBlock(VAlert, {
                                    key: 0,
                                    type: "error",
                                    closable: "",
                                    icon: "mdi-alert-circle",
                                    variant: "tonal",
                                    class: "mb-4",
                                    "onUpdate:modelValue": ($event) => error.value = ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                      createTextVNode(" " + toDisplayString(error.value), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                  message.value && status.value !== "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                    key: 1,
                                    type: "info",
                                    icon: "mdi-information-outline",
                                    variant: "tonal",
                                    class: "mb-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                      createTextVNode(" " + toDisplayString(message.value), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  status.value === "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                    key: 2,
                                    type: "success",
                                    icon: "mdi-check-all",
                                    variant: "tonal",
                                    class: "mb-4",
                                    "onUpdate:modelValue": ($event) => message.value = ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                      createTextVNode(" " + toDisplayString(message.value), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                  createVNode(VTextField, {
                                    modelValue: url.value,
                                    "onUpdate:modelValue": ($event) => url.value = $event,
                                    label: "YouTube 影片網址",
                                    placeholder: "例如: https://www.youtube.com/watch?v=...",
                                    variant: "outlined",
                                    disabled: isProcessing.value,
                                    rules: [(v) => !!v || "網址不能為空"],
                                    "prepend-inner-icon": "mdi-link-variant",
                                    clearable: "",
                                    class: "mb-6"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "rules"]),
                                  createVNode(VRadioGroup, {
                                    modelValue: format.value,
                                    "onUpdate:modelValue": ($event) => format.value = $event,
                                    label: "選擇輸出格式",
                                    inline: "",
                                    disabled: isProcessing.value,
                                    class: "mb-8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "MP3 (音訊)",
                                        value: "mp3",
                                        color: "primary",
                                        icon: "mdi-music-box",
                                        class: "mr-4"
                                      }),
                                      createVNode(VRadio, {
                                        label: "MP4 (影片)",
                                        value: "mp4",
                                        color: "primary",
                                        icon: "mdi-video",
                                        class: "mr-4"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                  jobId.value ? (openBlock(), createBlock(VCard, {
                                    key: 3,
                                    loading: isProcessing.value,
                                    color: statusColor.value,
                                    variant: "tonal",
                                    class: "mb-6 pa-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                        createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                        createVNode(VChip, {
                                          color: statusColor.value,
                                          variant: "flat",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(jobId.value), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]),
                                      createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                        createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                        createVNode(VChip, {
                                          color: statusColor.value,
                                          variant: "outlined",
                                          size: "default"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(statusText.value), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]),
                                      createVNode(VProgressLinear, {
                                        modelValue: progress.value,
                                        "onUpdate:modelValue": ($event) => progress.value = $event,
                                        color: statusColor.value,
                                        height: "16",
                                        rounded: "",
                                        striped: "",
                                        class: "my-2"
                                      }, {
                                        default: withCtx(({ value }) => [
                                          createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "color"])) : createCommentVNode("", true),
                                  createVNode(VBtn, {
                                    onClick: handleSubmit,
                                    loading: isProcessing.value,
                                    disabled: isProcessing.value,
                                    color: isProcessing.value ? "primary" : "success",
                                    size: "x-large",
                                    block: "",
                                    elevation: "8",
                                    rounded: "lg",
                                    class: "text-button"
                                  }, {
                                    loader: withCtx(() => [
                                      createVNode("span", { class: "custom-loader" }, [
                                        createVNode(VIcon, {
                                          icon: "mdi-cached",
                                          class: "spin-icon"
                                        }),
                                        createTextVNode(" 處理中... ")
                                      ])
                                    ]),
                                    default: withCtx(() => [
                                      status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled", "color"]),
                                  createVNode(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" **備註:** "),
                                      isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, {
                      justify: "center",
                      align: "start"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          sm: "10",
                          md: "8",
                          lg: "6",
                          xl: "5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              class: "pa-4 pa-sm-8",
                              elevation: "12",
                              rounded: "xl"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" YouTube下載器 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardSubtitle, { class: "text-center mb-6" }, {
                                  default: withCtx(() => [
                                    createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                    createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                  ]),
                                  _: 1
                                }),
                                error.value ? (openBlock(), createBlock(VAlert, {
                                  key: 0,
                                  type: "error",
                                  closable: "",
                                  icon: "mdi-alert-circle",
                                  variant: "tonal",
                                  class: "mb-4",
                                  "onUpdate:modelValue": ($event) => error.value = ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                    createTextVNode(" " + toDisplayString(error.value), 1)
                                  ]),
                                  _: 1
                                }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                message.value && status.value !== "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                  key: 1,
                                  type: "info",
                                  icon: "mdi-information-outline",
                                  variant: "tonal",
                                  class: "mb-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                    createTextVNode(" " + toDisplayString(message.value), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                status.value === "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                  key: 2,
                                  type: "success",
                                  icon: "mdi-check-all",
                                  variant: "tonal",
                                  class: "mb-4",
                                  "onUpdate:modelValue": ($event) => message.value = ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                    createTextVNode(" " + toDisplayString(message.value), 1)
                                  ]),
                                  _: 1
                                }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                                createVNode(VTextField, {
                                  modelValue: url.value,
                                  "onUpdate:modelValue": ($event) => url.value = $event,
                                  label: "YouTube 影片網址",
                                  placeholder: "例如: https://www.youtube.com/watch?v=...",
                                  variant: "outlined",
                                  disabled: isProcessing.value,
                                  rules: [(v) => !!v || "網址不能為空"],
                                  "prepend-inner-icon": "mdi-link-variant",
                                  clearable: "",
                                  class: "mb-6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "rules"]),
                                createVNode(VRadioGroup, {
                                  modelValue: format.value,
                                  "onUpdate:modelValue": ($event) => format.value = $event,
                                  label: "選擇輸出格式",
                                  inline: "",
                                  disabled: isProcessing.value,
                                  class: "mb-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "MP3 (音訊)",
                                      value: "mp3",
                                      color: "primary",
                                      icon: "mdi-music-box",
                                      class: "mr-4"
                                    }),
                                    createVNode(VRadio, {
                                      label: "MP4 (影片)",
                                      value: "mp4",
                                      color: "primary",
                                      icon: "mdi-video",
                                      class: "mr-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                jobId.value ? (openBlock(), createBlock(VCard, {
                                  key: 3,
                                  loading: isProcessing.value,
                                  color: statusColor.value,
                                  variant: "tonal",
                                  class: "mb-6 pa-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                      createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                      createVNode(VChip, {
                                        color: statusColor.value,
                                        variant: "flat",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(jobId.value), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["color"])
                                    ]),
                                    createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                      createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                      createVNode(VChip, {
                                        color: statusColor.value,
                                        variant: "outlined",
                                        size: "default"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(statusText.value), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["color"])
                                    ]),
                                    createVNode(VProgressLinear, {
                                      modelValue: progress.value,
                                      "onUpdate:modelValue": ($event) => progress.value = $event,
                                      color: statusColor.value,
                                      height: "16",
                                      rounded: "",
                                      striped: "",
                                      class: "my-2"
                                    }, {
                                      default: withCtx(({ value }) => [
                                        createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                  ]),
                                  _: 1
                                }, 8, ["loading", "color"])) : createCommentVNode("", true),
                                createVNode(VBtn, {
                                  onClick: handleSubmit,
                                  loading: isProcessing.value,
                                  disabled: isProcessing.value,
                                  color: isProcessing.value ? "primary" : "success",
                                  size: "x-large",
                                  block: "",
                                  elevation: "8",
                                  rounded: "lg",
                                  class: "text-button"
                                }, {
                                  loader: withCtx(() => [
                                    createVNode("span", { class: "custom-loader" }, [
                                      createVNode(VIcon, {
                                        icon: "mdi-cached",
                                        class: "spin-icon"
                                      }),
                                      createTextVNode(" 處理中... ")
                                    ])
                                  ]),
                                  default: withCtx(() => [
                                    status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled", "color"]),
                                createVNode(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" **備註:** "),
                                    isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, { fluid: "" }, {
                default: withCtx(() => [
                  createVNode(VRow, {
                    justify: "center",
                    align: "start"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        sm: "10",
                        md: "8",
                        lg: "6",
                        xl: "5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            class: "pa-4 pa-sm-8",
                            elevation: "12",
                            rounded: "xl"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h4 text-sm-h3 text-center font-weight-bold mb-4" }, {
                                default: withCtx(() => [
                                  createTextVNode(" YouTube下載器 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardSubtitle, { class: "text-center mb-6" }, {
                                default: withCtx(() => [
                                  createVNode("p", null, "輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。"),
                                  createVNode("p", null, "例如：https://www.youtube.com/watch?v=JfYbYIv2-tY")
                                ]),
                                _: 1
                              }),
                              error.value ? (openBlock(), createBlock(VAlert, {
                                key: 0,
                                type: "error",
                                closable: "",
                                icon: "mdi-alert-circle",
                                variant: "tonal",
                                class: "mb-4",
                                "onUpdate:modelValue": ($event) => error.value = ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "font-weight-medium" }, "錯誤:"),
                                  createTextVNode(" " + toDisplayString(error.value), 1)
                                ]),
                                _: 1
                              }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                              message.value && status.value !== "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                key: 1,
                                type: "info",
                                icon: "mdi-information-outline",
                                variant: "tonal",
                                class: "mb-4"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "font-weight-medium" }, "狀態:"),
                                  createTextVNode(" " + toDisplayString(message.value), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              status.value === "COMPLETED" ? (openBlock(), createBlock(VAlert, {
                                key: 2,
                                type: "success",
                                icon: "mdi-check-all",
                                variant: "tonal",
                                class: "mb-4",
                                "onUpdate:modelValue": ($event) => message.value = ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "font-weight-medium" }, "下載已完成!"),
                                  createTextVNode(" " + toDisplayString(message.value), 1)
                                ]),
                                _: 1
                              }, 8, ["onUpdate:modelValue"])) : createCommentVNode("", true),
                              createVNode(VTextField, {
                                modelValue: url.value,
                                "onUpdate:modelValue": ($event) => url.value = $event,
                                label: "YouTube 影片網址",
                                placeholder: "例如: https://www.youtube.com/watch?v=...",
                                variant: "outlined",
                                disabled: isProcessing.value,
                                rules: [(v) => !!v || "網址不能為空"],
                                "prepend-inner-icon": "mdi-link-variant",
                                clearable: "",
                                class: "mb-6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "rules"]),
                              createVNode(VRadioGroup, {
                                modelValue: format.value,
                                "onUpdate:modelValue": ($event) => format.value = $event,
                                label: "選擇輸出格式",
                                inline: "",
                                disabled: isProcessing.value,
                                class: "mb-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VRadio, {
                                    label: "MP3 (音訊)",
                                    value: "mp3",
                                    color: "primary",
                                    icon: "mdi-music-box",
                                    class: "mr-4"
                                  }),
                                  createVNode(VRadio, {
                                    label: "MP4 (影片)",
                                    value: "mp4",
                                    color: "primary",
                                    icon: "mdi-video",
                                    class: "mr-4"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                              jobId.value ? (openBlock(), createBlock(VCard, {
                                key: 3,
                                loading: isProcessing.value,
                                color: statusColor.value,
                                variant: "tonal",
                                class: "mb-6 pa-4"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                    createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "任務 ID:"),
                                    createVNode(VChip, {
                                      color: statusColor.value,
                                      variant: "flat",
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(jobId.value), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["color"])
                                  ]),
                                  createVNode("div", { class: "d-flex justify-space-between align-center mb-4" }, [
                                    createVNode("span", { class: "text-subtitle-1 font-weight-medium" }, "目前狀態:"),
                                    createVNode(VChip, {
                                      color: statusColor.value,
                                      variant: "outlined",
                                      size: "default"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(statusText.value), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["color"])
                                  ]),
                                  createVNode(VProgressLinear, {
                                    modelValue: progress.value,
                                    "onUpdate:modelValue": ($event) => progress.value = $event,
                                    color: statusColor.value,
                                    height: "16",
                                    rounded: "",
                                    striped: "",
                                    class: "my-2"
                                  }, {
                                    default: withCtx(({ value }) => [
                                      createVNode("span", { class: "text-white font-weight-bold text-caption" }, toDisplayString(value.toFixed(1)) + "% ", 1)
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue", "color"])
                                ]),
                                _: 1
                              }, 8, ["loading", "color"])) : createCommentVNode("", true),
                              createVNode(VBtn, {
                                onClick: handleSubmit,
                                loading: isProcessing.value,
                                disabled: isProcessing.value,
                                color: isProcessing.value ? "primary" : "success",
                                size: "x-large",
                                block: "",
                                elevation: "8",
                                rounded: "lg",
                                class: "text-button"
                              }, {
                                loader: withCtx(() => [
                                  createVNode("span", { class: "custom-loader" }, [
                                    createVNode(VIcon, {
                                      icon: "mdi-cached",
                                      class: "spin-icon"
                                    }),
                                    createTextVNode(" 處理中... ")
                                  ])
                                ]),
                                default: withCtx(() => [
                                  status.value === "IDLE" || status.value === "FAILED" || status.value === "ERROR" ? (openBlock(), createBlock("span", { key: 0 }, "開始下載")) : status.value === "COMPLETED" ? (openBlock(), createBlock("span", { key: 1 }, "下載完成 (點擊即可重新提交)")) : status.value === "PENDING" ? (openBlock(), createBlock("span", { key: 2 }, "提交中...")) : status.value === "DOWNLOADING" ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(statusText.value), 1)) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled", "color"]),
                              createVNode(VCardText, { class: "text-caption text-center mt-6 text-grey-darken-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" **備註:** "),
                                  isProcessing.value ? (openBlock(), createBlock("span", { key: 0 }, "伺服器正在背景處理您的請求。請不要關閉頁面。")) : (openBlock(), createBlock("span", { key: 1 }, "下載時間取決於伺服器處理速度與檔案大小。"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Tools/YTconverter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const YTconverter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ab031ce"]]);

export { YTconverter as default };
//# sourceMappingURL=YTconverter-DWKkqKh6.mjs.map
