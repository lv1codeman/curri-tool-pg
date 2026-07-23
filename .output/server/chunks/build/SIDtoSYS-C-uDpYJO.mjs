import { ref, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { V as VCard, f as VCardItem, a as VCardTitle, b as VCardSubtitle, c as VCardText, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VDivider } from './VDivider-BEUbRpXn.mjs';
import { V as VBtn } from './VBtn-CygXX-_7.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VTextarea } from './VTextarea-Dd5Wf0dQ.mjs';
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
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './layout-BYmWGd6C.mjs';

const sampleContent = "S1234567\nM9876543\nD0000001\nZ5555555";
const _sfc_main = {
  __name: "SIDtoSYS",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const outputText = ref("");
    const inputRef = ref(null);
    const outputRef = ref(null);
    const snackbar = ref(false);
    const convertStudentIdToSystem = (studentId) => {
      if (!studentId || typeof studentId !== "string") {
        return "查無資料";
      }
      const firstChar = studentId.trim().toUpperCase().charAt(0);
      switch (firstChar) {
        case "S":
          return "學士班";
        case "M":
          return "碩士班";
        case "D":
          return "博士班";
        default:
          return "查無資料";
      }
    };
    const convertedText = computed(() => {
      if (!inputText.value) {
        return "";
      }
      const lines = inputText.value.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
      const results = lines.map((line) => {
        return convertStudentIdToSystem(line);
      });
      return results.join("\n");
    });
    watch(convertedText, (newValue) => {
      outputText.value = newValue;
    });
    const handlePaste = (event) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text");
      inputText.value = pasteData.trim();
    };
    const clearTextareas = () => {
      inputText.value = "";
      outputText.value = "";
    };
    const copyToClipboard = async () => {
      try {
        if (!(void 0).clipboard) {
          alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
          return;
        }
        await (void 0).clipboard.writeText(outputText.value);
        snackbar.value = true;
      } catch (err) {
        console.error("複製失敗:", err);
        alert("複製失敗，請手動複製。");
      }
    };
    const copySampleToClipboard = async () => {
      try {
        if (!(void 0).clipboard) {
          alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
          return;
        }
        await (void 0).clipboard.writeText(sampleContent);
        snackbar.value = true;
      } catch (err) {
        console.error("複製失敗:", err);
        alert("複製失敗，請手動複製。");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center" }, _attrs))} data-v-f37c4ca4><div data-v-f37c4ca4><h1 data-v-f37c4ca4>學號轉學制</h1><div class="d-flex" data-v-f37c4ca4>`);
      _push(ssrRenderComponent(VCard, {
        class: "my-2 my-card-wrapper",
        variant: "tonal",
        color: "teal"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`使用教學`);
                      } else {
                        return [
                          createTextVNode("使用教學")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`輸入限制：學號`);
                      } else {
                        return [
                          createTextVNode("輸入限制：學號")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("使用教學")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, null, {
                      default: withCtx(() => [
                        createTextVNode("輸入限制：學號")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul data-v-f37c4ca4${_scopeId2}><li data-v-f37c4ca4${_scopeId2}> 在左輸入框貼上從Excel複製的學號 (每行一個)，右邊輸入框會自動產出結果。 </li><li data-v-f37c4ca4${_scopeId2}>結果可將複製貼回Excel中使用。</li></ul>`);
                  _push3(ssrRenderComponent(VDivider, { class: "my-3" }, null, _parent3, _scopeId2));
                  _push3(`<p data-v-f37c4ca4${_scopeId2}><strong data-v-f37c4ca4${_scopeId2}>學制轉換規則：</strong></p><ul data-v-f37c4ca4${_scopeId2}><li data-v-f37c4ca4${_scopeId2}>學號開頭為 S = 學士班</li><li data-v-f37c4ca4${_scopeId2}>學號開頭為 M = 碩士班</li><li data-v-f37c4ca4${_scopeId2}>學號開頭為 D = 博士班</li><li data-v-f37c4ca4${_scopeId2}>其他開頭 = 查無資料</li></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      createVNode("li", null, " 在左輸入框貼上從Excel複製的學號 (每行一個)，右邊輸入框會自動產出結果。 "),
                      createVNode("li", null, "結果可將複製貼回Excel中使用。")
                    ]),
                    createVNode(VDivider, { class: "my-3" }),
                    createVNode("p", null, [
                      createVNode("strong", null, "學制轉換規則：")
                    ]),
                    createVNode("ul", null, [
                      createVNode("li", null, "學號開頭為 S = 學士班"),
                      createVNode("li", null, "學號開頭為 M = 碩士班"),
                      createVNode("li", null, "學號開頭為 D = 博士班"),
                      createVNode("li", null, "其他開頭 = 查無資料")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardActions, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    color: "teal-lighten-3 text-white",
                    variant: "elevated",
                    onClick: copySampleToClipboard
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 點我複製範例 `);
                        _push4(ssrRenderComponent(VIcon, {
                          icon: "mdi-content-copy",
                          end: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" 點我複製範例 "),
                          createVNode(VIcon, {
                            icon: "mdi-content-copy",
                            end: ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      color: "teal-lighten-3 text-white",
                      variant: "elevated",
                      onClick: copySampleToClipboard
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 點我複製範例 "),
                        createVNode(VIcon, {
                          icon: "mdi-content-copy",
                          end: ""
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
              createVNode(VCardItem, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("使用教學")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, null, {
                    default: withCtx(() => [
                      createTextVNode("輸入限制：學號")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("ul", null, [
                    createVNode("li", null, " 在左輸入框貼上從Excel複製的學號 (每行一個)，右邊輸入框會自動產出結果。 "),
                    createVNode("li", null, "結果可將複製貼回Excel中使用。")
                  ]),
                  createVNode(VDivider, { class: "my-3" }),
                  createVNode("p", null, [
                    createVNode("strong", null, "學制轉換規則：")
                  ]),
                  createVNode("ul", null, [
                    createVNode("li", null, "學號開頭為 S = 學士班"),
                    createVNode("li", null, "學號開頭為 M = 碩士班"),
                    createVNode("li", null, "學號開頭為 D = 博士班"),
                    createVNode("li", null, "其他開頭 = 查無資料")
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "teal-lighten-3 text-white",
                    variant: "elevated",
                    onClick: copySampleToClipboard
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 點我複製範例 "),
                      createVNode(VIcon, {
                        icon: "mdi-content-copy",
                        end: ""
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
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, {
        id: "mpage",
        class: "px-0 pt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, {
              "no-gutters": "",
              class: "align-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextarea, {
                          ref_key: "inputRef",
                          ref: inputRef,
                          modelValue: inputText.value,
                          "onUpdate:modelValue": ($event) => inputText.value = $event,
                          class: "resizable-textarea text-right",
                          label: "輸入學號 (每行一個)",
                          onPaste: handlePaste
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, {
                            ref_key: "inputRef",
                            ref: inputRef,
                            modelValue: inputText.value,
                            "onUpdate:modelValue": ($event) => inputText.value = $event,
                            class: "resizable-textarea text-right",
                            label: "輸入學號 (每行一個)",
                            onPaste: handlePaste
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "auto",
                    class: "px-2 pb-5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex flex-column ga-5" data-v-f37c4ca4${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          color: "green-lighten-3 text-grey-darken-4",
                          onClick: copyToClipboard
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Copy `);
                              _push5(ssrRenderComponent(VIcon, {
                                icon: "mdi-content-copy",
                                end: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Copy "),
                                createVNode(VIcon, {
                                  icon: "mdi-content-copy",
                                  end: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "blue-lighten-3 text-grey-darken-4",
                          onClick: clearTextareas
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Clear `);
                              _push5(ssrRenderComponent(VIcon, {
                                icon: "mdi-close-circle-outline",
                                end: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Clear "),
                                createVNode(VIcon, {
                                  icon: "mdi-close-circle-outline",
                                  end: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex flex-column ga-5" }, [
                            createVNode(VBtn, {
                              color: "green-lighten-3 text-grey-darken-4",
                              onClick: copyToClipboard
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Copy "),
                                createVNode(VIcon, {
                                  icon: "mdi-content-copy",
                                  end: ""
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "blue-lighten-3 text-grey-darken-4",
                              onClick: clearTextareas
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Clear "),
                                createVNode(VIcon, {
                                  icon: "mdi-close-circle-outline",
                                  end: ""
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextarea, {
                          ref_key: "outputRef",
                          ref: outputRef,
                          modelValue: outputText.value,
                          "onUpdate:modelValue": ($event) => outputText.value = $event,
                          class: "resizable-textarea",
                          label: "輸出學制",
                          readonly: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, {
                            ref_key: "outputRef",
                            ref: outputRef,
                            modelValue: outputText.value,
                            "onUpdate:modelValue": ($event) => outputText.value = $event,
                            class: "resizable-textarea",
                            label: "輸出學制",
                            readonly: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "auto" }, {
                      default: withCtx(() => [
                        createVNode(VTextarea, {
                          ref_key: "inputRef",
                          ref: inputRef,
                          modelValue: inputText.value,
                          "onUpdate:modelValue": ($event) => inputText.value = $event,
                          class: "resizable-textarea text-right",
                          label: "輸入學號 (每行一個)",
                          onPaste: handlePaste
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "auto",
                      class: "px-2 pb-5"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex flex-column ga-5" }, [
                          createVNode(VBtn, {
                            color: "green-lighten-3 text-grey-darken-4",
                            onClick: copyToClipboard
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Copy "),
                              createVNode(VIcon, {
                                icon: "mdi-content-copy",
                                end: ""
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "blue-lighten-3 text-grey-darken-4",
                            onClick: clearTextareas
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Clear "),
                              createVNode(VIcon, {
                                icon: "mdi-close-circle-outline",
                                end: ""
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "auto" }, {
                      default: withCtx(() => [
                        createVNode(VTextarea, {
                          ref_key: "outputRef",
                          ref: outputRef,
                          modelValue: outputText.value,
                          "onUpdate:modelValue": ($event) => outputText.value = $event,
                          class: "resizable-textarea",
                          label: "輸出學制",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(VRow, {
                "no-gutters": "",
                class: "align-center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "auto" }, {
                    default: withCtx(() => [
                      createVNode(VTextarea, {
                        ref_key: "inputRef",
                        ref: inputRef,
                        modelValue: inputText.value,
                        "onUpdate:modelValue": ($event) => inputText.value = $event,
                        class: "resizable-textarea text-right",
                        label: "輸入學號 (每行一個)",
                        onPaste: handlePaste
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "auto",
                    class: "px-2 pb-5"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex flex-column ga-5" }, [
                        createVNode(VBtn, {
                          color: "green-lighten-3 text-grey-darken-4",
                          onClick: copyToClipboard
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Copy "),
                            createVNode(VIcon, {
                              icon: "mdi-content-copy",
                              end: ""
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          color: "blue-lighten-3 text-grey-darken-4",
                          onClick: clearTextareas
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Clear "),
                            createVNode(VIcon, {
                              icon: "mdi-close-circle-outline",
                              end: ""
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "auto" }, {
                    default: withCtx(() => [
                      createVNode(VTextarea, {
                        ref_key: "outputRef",
                        ref: outputRef,
                        modelValue: outputText.value,
                        "onUpdate:modelValue": ($event) => outputText.value = $event,
                        class: "resizable-textarea",
                        label: "輸出學制",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: snackbar.value,
        "onUpdate:modelValue": ($event) => snackbar.value = $event,
        timeout: 2e3,
        color: "success",
        location: "bottom right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 已複製到剪貼簿 `);
          } else {
            return [
              createTextVNode(" 已複製到剪貼簿 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Converters/SIDtoSYS.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SIDtoSYS = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f37c4ca4"]]);

export { SIDtoSYS as default };
//# sourceMappingURL=SIDtoSYS-C-uDpYJO.mjs.map
