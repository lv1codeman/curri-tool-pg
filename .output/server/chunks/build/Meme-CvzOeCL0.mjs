import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { V as VCard, e as VImg, c as VCardText, a as VCardTitle, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VTextField } from './VTextField-B7wWYftJ.mjs';
import { V as VBtn, a as VProgressCircular } from './VBtn-CygXX-_7.mjs';
import { V as VMenu } from './VMenu-CPs0p4-G.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
import { V as VDialog } from './VDialog-DhJf4vpZ.mjs';
import { V as VFileInput } from './VFileInput-BWTVczr1.mjs';
import { V as VSpacer } from './VSpacer-C9EBCiip.mjs';
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
import './autofocus-DcW6hXk9.mjs';
import './index-Cr-Vuh5O.mjs';
import './forwardRefs-CJyhXHYH.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './VChip-F7YMK5qF.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './layout-BYmWGd6C.mjs';

const _sfc_main$1 = {
  __name: "MemeCard",
  __ssrInlineRender: true,
  props: {
    title: String,
    imageUrl: String
  },
  emits: ["copy", "expand"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        hover: "",
        class: "mx-auto h-100 transition-card"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VImg, {
              src: __props.imageUrl,
              height: "150px",
              cover: "",
              class: "align-end cursor-pointer",
              onClick: ($event) => _ctx.$emit("copy", { url: __props.imageUrl, title: __props.title })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, {
                    class: "text-white bg-black-alpha-50 cursor-pointer",
                    onClick: ($event) => _ctx.$emit("expand")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.title), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, {
                      class: "text-white bg-black-alpha-50 cursor-pointer",
                      onClick: withModifiers(($event) => _ctx.$emit("expand"), ["stop"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.title), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VImg, {
                src: __props.imageUrl,
                height: "150px",
                cover: "",
                class: "align-end cursor-pointer",
                onClick: withModifiers(($event) => _ctx.$emit("copy", { url: __props.imageUrl, title: __props.title }), ["stop"])
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, {
                    class: "text-white bg-black-alpha-50 cursor-pointer",
                    onClick: withModifiers(($event) => _ctx.$emit("expand"), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.title), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }, 8, ["src", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MemeCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ab68130c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Meme",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const memes = ref([]);
    const searchQuery = ref("");
    const isLoading = ref(true);
    const uploadDialog = ref(false);
    const isUploading = ref(false);
    const newTitle = ref("");
    const selectedFile = ref(null);
    const snackbar = ref(false);
    const snackbarText = ref("");
    const snackbarColor = ref("success");
    async function fetchMemes() {
      isLoading.value = true;
      try {
        const response = await $curridataAPI.get("/api/memes");
        memes.value = response.data.map((m) => ({
          ...m,
          showPreview: false
        }));
      } catch (error) {
        console.error("無法取得梗圖列表:", error);
        showToast("❌ 無法連線至伺服器", "error");
      } finally {
        isLoading.value = false;
      }
    }
    async function handleUpload() {
      if (!selectedFile.value || !newTitle.value) {
        showToast("請輸入名稱並選擇圖片", "warning");
        return;
      }
      isUploading.value = true;
      const formData = new FormData();
      const file = Array.isArray(selectedFile.value) ? selectedFile.value[0] : selectedFile.value;
      formData.append("file", file);
      formData.append("title", newTitle.value);
      try {
        await $curridataAPI.post("/api/upload-meme", formData, {
          // 關鍵點：將 Content-Type 設為 undefined
          // 這會告訴 Axios 不要使用插件裡的 application/json
          // 瀏覽器發現 body 是 FormData 後，會自動補上 multipart/form-data 並加上正確的 boundary
          headers: {
            "Content-Type": void 0
          }
        });
        showToast("✅ 梗圖上傳成功！", "success");
        closeUploadDialog();
        await fetchMemes();
      } catch (error) {
        console.error("上傳失敗細節:", error.response?.data);
        showToast("❌ 上傳失敗", "error");
      } finally {
        isUploading.value = false;
      }
    }
    const filteredMemes = computed(() => {
      if (!searchQuery.value) return memes.value;
      const keywords = searchQuery.value.toLowerCase().trim().split(/\s+/);
      return memes.value.filter((meme) => {
        const title = meme.title.toLowerCase();
        return keywords.every((key) => title.includes(key));
      });
    });
    async function copyImageToClipboard({ url, title }) {
      try {
        const finalUrl = url.replace("http://", "https://") + `?t=${Date.now()}`;
        const response = await fetch(finalUrl, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        if (!response.ok) throw new Error("Fetch 失敗");
        const blob = await response.blob();
        const img = new Image();
        img.crossOrigin = "anonymous";
        const objectUrl = URL.createObjectURL(blob);
        img.src = objectUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        const canvas = (void 0).createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d")?.drawImage(img, 0, 0);
        canvas.toBlob(async (pngBlob) => {
          if (!pngBlob) return;
          try {
            const item = new ClipboardItem({ "image/png": pngBlob });
            await (void 0).clipboard.write([item]);
            showToast(`✅ 已複製 「${title}」`, "success");
          } catch (err) {
            showToast("❌ 寫入剪貼簿失敗", "error");
          } finally {
            URL.revokeObjectURL(objectUrl);
          }
        }, "image/png");
      } catch (err) {
        showToast("❌ 複製失敗", "error");
      }
    }
    function closeUploadDialog() {
      uploadDialog.value = false;
      newTitle.value = "";
      selectedFile.value = null;
    }
    function showToast(text, color = "success") {
      snackbarText.value = text;
      snackbarColor.value = color;
      snackbar.value = true;
    }
    function ensureHttps(url) {
      return url ? url.replace("http://", "https://") : "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MemeCard = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, mergeProps({ style: { "max-width": "1300px" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, {
              justify: "center",
              class: "mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex align-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          label: "搜尋梗圖關鍵字...",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mr-4"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          "prepend-icon": "mdi-upload",
                          onClick: ($event) => uploadDialog.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 上傳梗圖 `);
                            } else {
                              return [
                                createTextVNode(" 上傳梗圖 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: searchQuery.value,
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            label: "搜尋梗圖關鍵字...",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": "",
                            class: "mr-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VBtn, {
                            color: "primary",
                            "prepend-icon": "mdi-upload",
                            onClick: ($event) => uploadDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 上傳梗圖 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      md: "6",
                      class: "d-flex align-center"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          label: "搜尋梗圖關鍵字...",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mr-4"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VBtn, {
                          color: "primary",
                          "prepend-icon": "mdi-upload",
                          onClick: ($event) => uploadDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 上傳梗圖 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!isLoading.value) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(filteredMemes.value, (meme, index) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: index,
                        cols: "12",
                        sm: "6",
                        md: "4",
                        lg: "3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VMenu, {
                              modelValue: meme.showPreview,
                              "onUpdate:modelValue": ($event) => meme.showPreview = $event,
                              "close-on-content-click": true,
                              location: "center",
                              transition: "scale-transition",
                              "min-width": "300"
                            }, {
                              activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_MemeCard, mergeProps({ ref_for: true }, props, {
                                    title: meme.title,
                                    "image-url": ensureHttps(meme.url),
                                    onCopy: copyImageToClipboard,
                                    onExpand: ($event) => meme.showPreview = true
                                  }), null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_MemeCard, mergeProps({ ref_for: true }, props, {
                                      title: meme.title,
                                      "image-url": ensureHttps(meme.url),
                                      onCopy: copyImageToClipboard,
                                      onExpand: ($event) => meme.showPreview = true
                                    }), null, 16, ["title", "image-url", "onExpand"])
                                  ];
                                }
                              }),
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCard, {
                                    width: "500",
                                    elevation: "24",
                                    class: "rounded-xl overflow-hidden"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VImg, {
                                          src: ensureHttps(meme.url),
                                          "max-height": "600",
                                          contain: "",
                                          class: "bg-grey-darken-4"
                                        }, {
                                          placeholder: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VRow, {
                                                class: "fill-height ma-0",
                                                align: "center",
                                                justify: "center"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VProgressCircular, {
                                                      indeterminate: "",
                                                      color: "primary"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VProgressCircular, {
                                                        indeterminate: "",
                                                        color: "primary"
                                                      })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VRow, {
                                                  class: "fill-height ma-0",
                                                  align: "center",
                                                  justify: "center"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VProgressCircular, {
                                                      indeterminate: "",
                                                      color: "primary"
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="text-h6 font-weight-bold" data-v-90c3069f${_scopeId6}>${ssrInterpolate(meme.title)}</div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VImg, {
                                            src: ensureHttps(meme.url),
                                            "max-height": "600",
                                            contain: "",
                                            class: "bg-grey-darken-4"
                                          }, {
                                            placeholder: withCtx(() => [
                                              createVNode(VRow, {
                                                class: "fill-height ma-0",
                                                align: "center",
                                                justify: "center"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VProgressCircular, {
                                                    indeterminate: "",
                                                    color: "primary"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["src"]),
                                          createVNode(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCard, {
                                      width: "500",
                                      elevation: "24",
                                      class: "rounded-xl overflow-hidden"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, {
                                          src: ensureHttps(meme.url),
                                          "max-height": "600",
                                          contain: "",
                                          class: "bg-grey-darken-4"
                                        }, {
                                          placeholder: withCtx(() => [
                                            createVNode(VRow, {
                                              class: "fill-height ma-0",
                                              align: "center",
                                              justify: "center"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VProgressCircular, {
                                                  indeterminate: "",
                                                  color: "primary"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["src"]),
                                        createVNode(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VMenu, {
                                modelValue: meme.showPreview,
                                "onUpdate:modelValue": ($event) => meme.showPreview = $event,
                                "close-on-content-click": true,
                                location: "center",
                                transition: "scale-transition",
                                "min-width": "300"
                              }, {
                                activator: withCtx(({ props }) => [
                                  createVNode(_component_MemeCard, mergeProps({ ref_for: true }, props, {
                                    title: meme.title,
                                    "image-url": ensureHttps(meme.url),
                                    onCopy: copyImageToClipboard,
                                    onExpand: ($event) => meme.showPreview = true
                                  }), null, 16, ["title", "image-url", "onExpand"])
                                ]),
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    width: "500",
                                    elevation: "24",
                                    class: "rounded-xl overflow-hidden"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, {
                                        src: ensureHttps(meme.url),
                                        "max-height": "600",
                                        contain: "",
                                        class: "bg-grey-darken-4"
                                      }, {
                                        placeholder: withCtx(() => [
                                          createVNode(VRow, {
                                            class: "fill-height ma-0",
                                            align: "center",
                                            justify: "center"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VProgressCircular, {
                                                indeterminate: "",
                                                color: "primary"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["src"]),
                                      createVNode(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (filteredMemes.value.length === 0) {
                      _push3(ssrRenderComponent(VCol, {
                        cols: "12",
                        class: "text-center py-12"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, {
                              size: "64",
                              color: "grey-lighten-1"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-image-search-outline`);
                                } else {
                                  return [
                                    createTextVNode("mdi-image-search-outline")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`<p class="text-grey mt-2" data-v-90c3069f${_scopeId3}>找不到相關梗圖，換個關鍵字試試？</p>`);
                          } else {
                            return [
                              createVNode(VIcon, {
                                size: "64",
                                color: "grey-lighten-1"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-image-search-outline")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-grey mt-2" }, "找不到相關梗圖，換個關鍵字試試？")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredMemes.value, (meme, index) => {
                        return openBlock(), createBlock(VCol, {
                          key: index,
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(VMenu, {
                              modelValue: meme.showPreview,
                              "onUpdate:modelValue": ($event) => meme.showPreview = $event,
                              "close-on-content-click": true,
                              location: "center",
                              transition: "scale-transition",
                              "min-width": "300"
                            }, {
                              activator: withCtx(({ props }) => [
                                createVNode(_component_MemeCard, mergeProps({ ref_for: true }, props, {
                                  title: meme.title,
                                  "image-url": ensureHttps(meme.url),
                                  onCopy: copyImageToClipboard,
                                  onExpand: ($event) => meme.showPreview = true
                                }), null, 16, ["title", "image-url", "onExpand"])
                              ]),
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  width: "500",
                                  elevation: "24",
                                  class: "rounded-xl overflow-hidden"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: ensureHttps(meme.url),
                                      "max-height": "600",
                                      contain: "",
                                      class: "bg-grey-darken-4"
                                    }, {
                                      placeholder: withCtx(() => [
                                        createVNode(VRow, {
                                          class: "fill-height ma-0",
                                          align: "center",
                                          justify: "center"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VProgressCircular, {
                                              indeterminate: "",
                                              color: "primary"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["src"]),
                                    createVNode(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      filteredMemes.value.length === 0 ? (openBlock(), createBlock(VCol, {
                        key: 0,
                        cols: "12",
                        class: "text-center py-12"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, {
                            size: "64",
                            color: "grey-lighten-1"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-image-search-outline")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-grey mt-2" }, "找不到相關梗圖，換個關鍵字試試？")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VRow, { justify: "center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      class: "text-center py-12"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VProgressCircular, {
                            indeterminate: "",
                            color: "primary",
                            size: "50"
                          }, null, _parent4, _scopeId3));
                          _push4(`<p class="mt-4" data-v-90c3069f${_scopeId3}>梗圖載入中...</p>`);
                        } else {
                          return [
                            createVNode(VProgressCircular, {
                              indeterminate: "",
                              color: "primary",
                              size: "50"
                            }),
                            createVNode("p", { class: "mt-4" }, "梗圖載入中...")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        class: "text-center py-12"
                      }, {
                        default: withCtx(() => [
                          createVNode(VProgressCircular, {
                            indeterminate: "",
                            color: "primary",
                            size: "50"
                          }),
                          createVNode("p", { class: "mt-4" }, "梗圖載入中...")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(ssrRenderComponent(VDialog, {
              modelValue: uploadDialog.value,
              "onUpdate:modelValue": ($event) => uploadDialog.value = $event,
              "max-width": "450px",
              persistent: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { class: "rounded-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, { class: "bg-primary text-white px-6 py-4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`上傳新梗圖`);
                            } else {
                              return [
                                createTextVNode("上傳新梗圖")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "pt-8 px-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: newTitle.value,
                                "onUpdate:modelValue": ($event) => newTitle.value = $event,
                                label: "梗圖描述與關鍵字",
                                variant: "outlined",
                                placeholder: "例如：驚訝貓咪 表情包",
                                hint: "輸入愈詳細，之後搜尋愈容易找到喔！",
                                "persistent-hint": "",
                                class: "mb-10"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VFileInput, {
                                modelValue: selectedFile.value,
                                "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                                label: "選擇圖片檔案",
                                accept: "image/*",
                                variant: "outlined",
                                "prepend-icon": "mdi-camera",
                                "show-size": 1024
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: newTitle.value,
                                  "onUpdate:modelValue": ($event) => newTitle.value = $event,
                                  label: "梗圖描述與關鍵字",
                                  variant: "outlined",
                                  placeholder: "例如：驚訝貓咪 表情包",
                                  hint: "輸入愈詳細，之後搜尋愈容易找到喔！",
                                  "persistent-hint": "",
                                  class: "mb-10"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VFileInput, {
                                  modelValue: selectedFile.value,
                                  "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                                  label: "選擇圖片檔案",
                                  accept: "image/*",
                                  variant: "outlined",
                                  "prepend-icon": "mdi-camera",
                                  "show-size": 1024
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, { class: "pa-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                variant: "text",
                                onClick: closeUploadDialog,
                                disabled: isUploading.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消`);
                                  } else {
                                    return [
                                      createTextVNode("取消")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                variant: "elevated",
                                loading: isUploading.value,
                                onClick: handleUpload
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`確認上傳`);
                                  } else {
                                    return [
                                      createTextVNode("確認上傳")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  variant: "text",
                                  onClick: closeUploadDialog,
                                  disabled: isUploading.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  variant: "elevated",
                                  loading: isUploading.value,
                                  onClick: handleUpload
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("確認上傳")
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, { class: "bg-primary text-white px-6 py-4" }, {
                            default: withCtx(() => [
                              createTextVNode("上傳新梗圖")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "pt-8 px-6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: newTitle.value,
                                "onUpdate:modelValue": ($event) => newTitle.value = $event,
                                label: "梗圖描述與關鍵字",
                                variant: "outlined",
                                placeholder: "例如：驚訝貓咪 表情包",
                                hint: "輸入愈詳細，之後搜尋愈容易找到喔！",
                                "persistent-hint": "",
                                class: "mb-10"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VFileInput, {
                                modelValue: selectedFile.value,
                                "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                                label: "選擇圖片檔案",
                                accept: "image/*",
                                variant: "outlined",
                                "prepend-icon": "mdi-camera",
                                "show-size": 1024
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, { class: "pa-6" }, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                variant: "text",
                                onClick: closeUploadDialog,
                                disabled: isUploading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("取消")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(VBtn, {
                                color: "primary",
                                variant: "elevated",
                                loading: isUploading.value,
                                onClick: handleUpload
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("確認上傳")
                                ]),
                                _: 1
                              }, 8, ["loading"])
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
                    createVNode(VCard, { class: "rounded-lg" }, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "bg-primary text-white px-6 py-4" }, {
                          default: withCtx(() => [
                            createTextVNode("上傳新梗圖")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, { class: "pt-8 px-6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: newTitle.value,
                              "onUpdate:modelValue": ($event) => newTitle.value = $event,
                              label: "梗圖描述與關鍵字",
                              variant: "outlined",
                              placeholder: "例如：驚訝貓咪 表情包",
                              hint: "輸入愈詳細，之後搜尋愈容易找到喔！",
                              "persistent-hint": "",
                              class: "mb-10"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VFileInput, {
                              modelValue: selectedFile.value,
                              "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                              label: "選擇圖片檔案",
                              accept: "image/*",
                              variant: "outlined",
                              "prepend-icon": "mdi-camera",
                              "show-size": 1024
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, { class: "pa-6" }, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              variant: "text",
                              onClick: closeUploadDialog,
                              disabled: isUploading.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode("取消")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(VBtn, {
                              color: "primary",
                              variant: "elevated",
                              loading: isUploading.value,
                              onClick: handleUpload
                            }, {
                              default: withCtx(() => [
                                createTextVNode("確認上傳")
                              ]),
                              _: 1
                            }, 8, ["loading"])
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
            _push2(ssrRenderComponent(VSnackbar, {
              modelValue: snackbar.value,
              "onUpdate:modelValue": ($event) => snackbar.value = $event,
              color: snackbarColor.value,
              location: "bottom right",
              timeout: "3000"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(snackbarText.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(snackbarText.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, {
                justify: "center",
                class: "mb-6"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6",
                    class: "d-flex align-center"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: searchQuery.value,
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        label: "搜尋梗圖關鍵字...",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": "",
                        class: "mr-4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VBtn, {
                        color: "primary",
                        "prepend-icon": "mdi-upload",
                        onClick: ($event) => uploadDialog.value = true
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 上傳梗圖 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              !isLoading.value ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredMemes.value, (meme, index) => {
                    return openBlock(), createBlock(VCol, {
                      key: index,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VMenu, {
                          modelValue: meme.showPreview,
                          "onUpdate:modelValue": ($event) => meme.showPreview = $event,
                          "close-on-content-click": true,
                          location: "center",
                          transition: "scale-transition",
                          "min-width": "300"
                        }, {
                          activator: withCtx(({ props }) => [
                            createVNode(_component_MemeCard, mergeProps({ ref_for: true }, props, {
                              title: meme.title,
                              "image-url": ensureHttps(meme.url),
                              onCopy: copyImageToClipboard,
                              onExpand: ($event) => meme.showPreview = true
                            }), null, 16, ["title", "image-url", "onExpand"])
                          ]),
                          default: withCtx(() => [
                            createVNode(VCard, {
                              width: "500",
                              elevation: "24",
                              class: "rounded-xl overflow-hidden"
                            }, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: ensureHttps(meme.url),
                                  "max-height": "600",
                                  contain: "",
                                  class: "bg-grey-darken-4"
                                }, {
                                  placeholder: withCtx(() => [
                                    createVNode(VRow, {
                                      class: "fill-height ma-0",
                                      align: "center",
                                      justify: "center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VProgressCircular, {
                                          indeterminate: "",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["src"]),
                                createVNode(VCardText, { class: "bg-surface text-center py-4 border-t" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(meme.title), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  filteredMemes.value.length === 0 ? (openBlock(), createBlock(VCol, {
                    key: 0,
                    cols: "12",
                    class: "text-center py-12"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, {
                        size: "64",
                        color: "grey-lighten-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-image-search-outline")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-grey mt-2" }, "找不到相關梗圖，換個關鍵字試試？")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })) : (openBlock(), createBlock(VRow, {
                key: 1,
                justify: "center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    class: "text-center py-12"
                  }, {
                    default: withCtx(() => [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        color: "primary",
                        size: "50"
                      }),
                      createVNode("p", { class: "mt-4" }, "梗圖載入中...")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })),
              createVNode(VDialog, {
                modelValue: uploadDialog.value,
                "onUpdate:modelValue": ($event) => uploadDialog.value = $event,
                "max-width": "450px",
                persistent: ""
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { class: "rounded-lg" }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "bg-primary text-white px-6 py-4" }, {
                        default: withCtx(() => [
                          createTextVNode("上傳新梗圖")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "pt-8 px-6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: newTitle.value,
                            "onUpdate:modelValue": ($event) => newTitle.value = $event,
                            label: "梗圖描述與關鍵字",
                            variant: "outlined",
                            placeholder: "例如：驚訝貓咪 表情包",
                            hint: "輸入愈詳細，之後搜尋愈容易找到喔！",
                            "persistent-hint": "",
                            class: "mb-10"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VFileInput, {
                            modelValue: selectedFile.value,
                            "onUpdate:modelValue": ($event) => selectedFile.value = $event,
                            label: "選擇圖片檔案",
                            accept: "image/*",
                            variant: "outlined",
                            "prepend-icon": "mdi-camera",
                            "show-size": 1024
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, { class: "pa-6" }, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: closeUploadDialog,
                            disabled: isUploading.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("取消")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            loading: isUploading.value,
                            onClick: handleUpload
                          }, {
                            default: withCtx(() => [
                              createTextVNode("確認上傳")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VSnackbar, {
                modelValue: snackbar.value,
                "onUpdate:modelValue": ($event) => snackbar.value = $event,
                color: snackbarColor.value,
                location: "bottom right",
                timeout: "3000"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(snackbarText.value), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "color"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Tools/Meme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Meme = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90c3069f"]]);

export { Meme as default };
//# sourceMappingURL=Meme-CvzOeCL0.mjs.map
