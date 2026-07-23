import { ref, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { V as VCard, c as VCardText, f as VCardItem, a as VCardTitle, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { d as VBtnToggle, V as VBtn } from './VBtn-CygXX-_7.mjs';
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

const _sfc_main = {
  __name: "Bdate",
  __ssrInlineRender: true,
  setup(__props) {
    const inputFormat = ref("chinese");
    const inputText = ref("");
    const outputText = ref("");
    const inputRef = ref(null);
    const outputRef = ref(null);
    const snackbar = ref(false);
    const sampleContent = computed(() => {
      if (inputFormat.value === "chinese") {
        return "89年06月22日\n88年11月06日\n103年1月2日\n5年5月20日";
      } else {
        return "2000/06/22\n1999/11/06\n2014/01/02\n1916/05/20";
      }
    });
    const currentModeSubtitle = computed(() => {
      return inputFormat.value === "chinese" ? "中文日期格式 (如：89年06月22日)" : "西元斜線格式 (如：2006/12/26 或 2006/1/2)";
    });
    const convertBirthToFormat = (birthStr) => {
      if (!birthStr || typeof birthStr !== "string") {
        return "格式錯誤";
      }
      const cleanStr = birthStr.trim();
      if (inputFormat.value === "chinese") {
        const regex = /^(\d{1,3})年(\d{1,2})月(\d{1,2})日$/;
        const match = cleanStr.match(regex);
        if (match) {
          const year = match[1].padStart(3, "0");
          const month = match[2].padStart(2, "0");
          const day = match[3].padStart(2, "0");
          return `${year}${month}${day}`;
        }
      } else if (inputFormat.value === "slash") {
        const regex = /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/;
        const match = cleanStr.match(regex);
        if (match) {
          const solarYear = parseInt(match[1], 10);
          const monthNum = parseInt(match[2], 10);
          const dayNum = parseInt(match[3], 10);
          if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
            return "格式錯誤";
          }
          const rocYear = solarYear - 1911;
          if (rocYear <= 0) {
            return "格式錯誤";
          }
          const year = String(rocYear).padStart(3, "0");
          const month = String(monthNum).padStart(2, "0");
          const day = String(dayNum).padStart(2, "0");
          return `${year}${month}${day}`;
        }
      }
      return "格式錯誤";
    };
    const convertedText = computed(() => {
      if (!inputText.value) {
        return "";
      }
      const lines = inputText.value.split("\n");
      const results = lines.map((line) => {
        if (line.trim().length === 0) return "";
        return convertBirthToFormat(line);
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
        await (void 0).clipboard.writeText(sampleContent.value);
        snackbar.value = true;
      } catch (err) {
        console.error("複製失敗:", err);
        alert("複製失敗，請手動複製。");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center" }, _attrs))} data-v-da83ba02><div data-v-da83ba02><h1 data-v-da83ba02>生日轉民國碼</h1>`);
      _push(ssrRenderComponent(VCard, {
        class: "my-2 d-inline-block",
        variant: "text",
        color: "teal-darken-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "py-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center ga-3" data-v-da83ba02${_scopeId2}><span class="text-subtitle-1 font-weight-bold" data-v-da83ba02${_scopeId2}>請選擇輸入格式：</span>`);
                  _push3(ssrRenderComponent(VBtnToggle, {
                    modelValue: inputFormat.value,
                    "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                    color: "teal-darken-2",
                    mandatory: "",
                    density: "compact",
                    variant: "outlined"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, { value: "chinese" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`中文日期 (89年06月22日)`);
                            } else {
                              return [
                                createTextVNode("中文日期 (89年06月22日)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, { value: "slash" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`西元斜線 (2006/12/26)`);
                            } else {
                              return [
                                createTextVNode("西元斜線 (2006/12/26)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, { value: "chinese" }, {
                            default: withCtx(() => [
                              createTextVNode("中文日期 (89年06月22日)")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, { value: "slash" }, {
                            default: withCtx(() => [
                              createTextVNode("西元斜線 (2006/12/26)")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center ga-3" }, [
                      createVNode("span", { class: "text-subtitle-1 font-weight-bold" }, "請選擇輸入格式："),
                      createVNode(VBtnToggle, {
                        modelValue: inputFormat.value,
                        "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                        color: "teal-darken-2",
                        mandatory: "",
                        density: "compact",
                        variant: "outlined"
                      }, {
                        default: withCtx(() => [
                          createVNode(VBtn, { value: "chinese" }, {
                            default: withCtx(() => [
                              createTextVNode("中文日期 (89年06月22日)")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, { value: "slash" }, {
                            default: withCtx(() => [
                              createTextVNode("西元斜線 (2006/12/26)")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, { class: "py-1" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center ga-3" }, [
                    createVNode("span", { class: "text-subtitle-1 font-weight-bold" }, "請選擇輸入格式："),
                    createVNode(VBtnToggle, {
                      modelValue: inputFormat.value,
                      "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                      color: "teal-darken-2",
                      mandatory: "",
                      density: "compact",
                      variant: "outlined"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, { value: "chinese" }, {
                          default: withCtx(() => [
                            createTextVNode("中文日期 (89年06月22日)")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, { value: "slash" }, {
                          default: withCtx(() => [
                            createTextVNode("西元斜線 (2006/12/26)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div data-v-da83ba02>`);
      _push(ssrRenderComponent(VCard, {
        class: "my-card-wrapper",
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
                        _push4(`目前模式：${ssrInterpolate(currentModeSubtitle.value)}`);
                      } else {
                        return [
                          createTextVNode("目前模式：" + toDisplayString(currentModeSubtitle.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("目前模式：" + toDisplayString(currentModeSubtitle.value), 1)
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
                  _push3(`<ul data-v-da83ba02${_scopeId2}><li data-v-da83ba02${_scopeId2}> 在左輸入框貼上從 Excel 複製的生日字串 (每行一個)，右邊輸入框會自動產出 7 碼民國碼。 </li><li data-v-da83ba02${_scopeId2}>結果可將複製貼回 Excel 中使用。</li></ul><p class="mt-3" data-v-da83ba02${_scopeId2}><strong data-v-da83ba02${_scopeId2}>轉換規則說明：</strong></p><ul data-v-da83ba02${_scopeId2}>`);
                  if (inputFormat.value === "chinese") {
                    _push3(`<li data-v-da83ba02${_scopeId2}> 將「XX年XX月XX日」統一轉換為「3碼民國年份 + 2碼月份 + 2碼日期」 </li>`);
                  } else {
                    _push3(`<li data-v-da83ba02${_scopeId2}> 將「YYYY/MM/DD」自動計算西元年減 1911 換算為民國年，並轉為「3碼民國年份 + 2碼月份 + 2碼日期」 </li>`);
                  }
                  _push3(`<li data-v-da83ba02${_scopeId2}> 民國年份若不足 3 碼（如 89 年），會自動在前方補 0 變為 089 </li><li data-v-da83ba02${_scopeId2}>格式不符或空行會自動顯示「格式錯誤」或跳過</li></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      createVNode("li", null, " 在左輸入框貼上從 Excel 複製的生日字串 (每行一個)，右邊輸入框會自動產出 7 碼民國碼。 "),
                      createVNode("li", null, "結果可將複製貼回 Excel 中使用。")
                    ]),
                    createVNode("p", { class: "mt-3" }, [
                      createVNode("strong", null, "轉換規則說明：")
                    ]),
                    createVNode("ul", null, [
                      inputFormat.value === "chinese" ? (openBlock(), createBlock("li", { key: 0 }, " 將「XX年XX月XX日」統一轉換為「3碼民國年份 + 2碼月份 + 2碼日期」 ")) : (openBlock(), createBlock("li", { key: 1 }, " 將「YYYY/MM/DD」自動計算西元年減 1911 換算為民國年，並轉為「3碼民國年份 + 2碼月份 + 2碼日期」 ")),
                      createVNode("li", null, " 民國年份若不足 3 碼（如 89 年），會自動在前方補 0 變為 089 "),
                      createVNode("li", null, "格式不符或空行會自動顯示「格式錯誤」或跳過")
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
                      createTextVNode("目前模式：" + toDisplayString(currentModeSubtitle.value), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("ul", null, [
                    createVNode("li", null, " 在左輸入框貼上從 Excel 複製的生日字串 (每行一個)，右邊輸入框會自動產出 7 碼民國碼。 "),
                    createVNode("li", null, "結果可將複製貼回 Excel 中使用。")
                  ]),
                  createVNode("p", { class: "mt-3" }, [
                    createVNode("strong", null, "轉換規則說明：")
                  ]),
                  createVNode("ul", null, [
                    inputFormat.value === "chinese" ? (openBlock(), createBlock("li", { key: 0 }, " 將「XX年XX月XX日」統一轉換為「3碼民國年份 + 2碼月份 + 2碼日期」 ")) : (openBlock(), createBlock("li", { key: 1 }, " 將「YYYY/MM/DD」自動計算西元年減 1911 換算為民國年，並轉為「3碼民國年份 + 2碼月份 + 2碼日期」 ")),
                    createVNode("li", null, " 民國年份若不足 3 碼（如 89 年），會自動在前方補 0 變為 089 "),
                    createVNode("li", null, "格式不符或空行會自動顯示「格式錯誤」或跳過")
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
                          label: "輸入生日 (每行一個)",
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
                            label: "輸入生日 (每行一個)",
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
                        _push4(`<div class="d-flex flex-column ga-5" data-v-da83ba02${_scopeId3}>`);
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
                          label: "輸出民國碼",
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
                            label: "輸出民國碼",
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
                          label: "輸入生日 (每行一個)",
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
                          label: "輸出民國碼",
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
                        label: "輸入生日 (每行一個)",
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
                        label: "輸出民國碼",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Converters/Bdate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Bdate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da83ba02"]]);

export { Bdate as default };
//# sourceMappingURL=Bdate-SO-PFRhz.mjs.map
