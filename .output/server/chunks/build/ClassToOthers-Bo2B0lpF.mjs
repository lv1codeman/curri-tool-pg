import { ref, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp, n as navigateTo } from './server.mjs';
import { V as VCard, f as VCardItem, a as VCardTitle, b as VCardSubtitle, c as VCardText, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VBtn } from './VBtn-CygXX-_7.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
import { V as VSelect } from './VSelect-Cq2H4SIe.mjs';
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
import './VTextField-B7wWYftJ.mjs';
import './VList-7bIncbX4.mjs';
import './VListItem-BmLTdZa_.mjs';
import './ssrBoot-ZQn7gOuX.mjs';
import './VDivider-BEUbRpXn.mjs';
import './VMenu-CPs0p4-G.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './VSelectionControl-CKFGRvJp.mjs';
import './VChip-F7YMK5qF.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './layout-BYmWGd6C.mjs';

const sampleContent = `輔一甲
特教一
教博一
復碩一
高照原民專班一
科博一
數一甲
物一甲
生一
化一
光博一
統資碩一
理學位碩一
科技機電產攜專班一
人管博一
車輛碩一
AI碩士學程一
智車一
技職碩一
英一
國一甲
地一
美一
科英碩一
翻譯碩一
台文碩一
歷碩一
機電一
電機一
電機博一
電子一
資工一
工學位碩一
資管一
會一甲
企管一
財金一
運一
運碩一
運健碩一
公育一
特殊學籍班(大學部)
特殊學籍學士班
特殊學籍碩博班
核心通識
物碩博
光電碩博
大三、四體育
歷大學
語文課
產業學士班
產業碩士班
地碩博
電機碩博
機電碩博
台碩博
國碩博
科技碩博
數碩博
科碩博
教碩博
輔導碩博

`;
const _sfc_main = {
  __name: "ClassToOthers",
  __ssrInlineRender: true,
  setup(__props) {
    const normalize = (str) => str.replace(/\r/g, "").replace(/\uFEFF/g, "").trim();
    const classMap = ref(/* @__PURE__ */ new Map());
    const inputText = ref("");
    const outputText = ref("");
    const convert_type = ref("系所簡稱");
    const snackbar = ref(false);
    const convert_types = [
      "系所簡稱",
      "系所全名",
      "學院簡稱",
      "學院全名",
      "系辦助理",
      "系辦助理分機",
      "系辦助理Email",
      "課務承辦人",
      "課務承辦人分機",
      "課務承辦人Email"
    ];
    const { $curridataAPI } = useNuxtApp();
    const handlePaste = (event) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text");
      inputText.value = pasteData.replace(/\r/g, "").replace(/\uFEFF/g, "").trim();
    };
    const copyToClipboard = async () => {
      try {
        await (void 0).clipboard.writeText(outputText.value);
        snackbar.value = true;
      } catch {
        alert("複製失敗");
      }
    };
    const copySampleToClipboard = async () => {
      try {
        await (void 0).clipboard.writeText(sampleContent);
        snackbar.value = true;
      } catch {
        alert("複製失敗");
      }
    };
    const clearTextareas = () => {
      inputText.value = "";
      outputText.value = "";
    };
    const copyUniqueEmails = async () => {
      const isAgentEmail = convert_type.value === "系辦助理Email";
      convert_type.value === "課務承辦人Email";
      const emailKey = isAgentEmail ? "AGENT_EMAIL" : "CAGENT_EMAIL";
      const emails = inputText.value.split("\n").map((line) => {
        const key = normalize(line);
        const data = classMap.value.get(key);
        return data?.[emailKey];
      }).filter(Boolean);
      const uniqueEmails = [...new Set(emails)];
      await (void 0).clipboard.writeText(uniqueEmails.join("\n"));
      snackbar.value = true;
    };
    const conversionFunctions = {
      系所全名: (data) => data.DEPT,
      系所簡稱: (data) => data.DEPT_S,
      學院全名: (data) => data.COLLEGE,
      學院簡稱: (data) => data.COLLEGE_S,
      系辦助理: (data) => data.AGENT_NAME,
      系辦助理分機: (data) => data.AGENT_EXT,
      系辦助理Email: (data) => data.AGENT_EMAIL,
      課務承辦人: (data) => data.CAGENT_NAME,
      課務承辦人分機: (data) => data.CAGENT_EXT,
      課務承辦人Email: (data) => data.CAGENT_EMAIL
    };
    const convertedText = computed(() => {
      if (!inputText.value || !classMap.value.size) return "";
      const fn = conversionFunctions[convert_type.value];
      return inputText.value.split("\n").map((line) => {
        const key = normalize(line);
        const data = classMap.value.get(key);
        if (data.length <= 0) {
          navigateTo("/welcome");
        }
        return data ? fn(data) || "查無資料" : "查無資料";
      }).join("\n");
    });
    watch(convertedText, (val) => {
      outputText.value = val;
    });
    const selectWidth = computed(() => {
      const max = convert_types.reduce((a, b) => a.length > b.length ? a : b);
      return max.length * 10 + 80;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center" }, _attrs))} data-v-37569c55><div data-v-37569c55><h1 data-v-37569c55>班級簡稱轉換(114以後)</h1><div class="d-flex" data-v-37569c55>`);
      _push(ssrRenderComponent(VCard, {
        class: "my-2 my-card-wrapper",
        variant: "tonal",
        color: "indigo"
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
                        _push4(`輸入限制：班級簡稱`);
                      } else {
                        return [
                          createTextVNode("輸入限制：班級簡稱")
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
                        createTextVNode("輸入限制：班級簡稱")
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
                  _push3(`<ul data-v-37569c55${_scopeId2}><li data-v-37569c55${_scopeId2}> 在左輸入框貼上從Excel複製的班級簡稱，右邊輸入框會自動產出結果。 </li><li data-v-37569c55${_scopeId2}>貼上後想看不同結果可選擇下拉選項</li><li data-v-37569c55${_scopeId2}>可將結果複製貼回Excel中使用。</li></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      createVNode("li", null, " 在左輸入框貼上從Excel複製的班級簡稱，右邊輸入框會自動產出結果。 "),
                      createVNode("li", null, "貼上後想看不同結果可選擇下拉選項"),
                      createVNode("li", null, "可將結果複製貼回Excel中使用。")
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
                    color: "indigo-lighten-3 text-white",
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
                      color: "indigo-lighten-3 text-white",
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
                      createTextVNode("輸入限制：班級簡稱")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("ul", null, [
                    createVNode("li", null, " 在左輸入框貼上從Excel複製的班級簡稱，右邊輸入框會自動產出結果。 "),
                    createVNode("li", null, "貼上後想看不同結果可選擇下拉選項"),
                    createVNode("li", null, "可將結果複製貼回Excel中使用。")
                  ])
                ]),
                _: 1
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "indigo-lighten-3 text-white",
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
      _push(`</div><div class="conditional-area d-flex align-center" data-v-37569c55>`);
      _push(ssrRenderComponent(VSelect, {
        modelValue: convert_type.value,
        "onUpdate:modelValue": ($event) => convert_type.value = $event,
        class: "function-selector mt-4 listitemheight",
        items: convert_types,
        label: "功能選擇",
        style: { maxWidth: `${selectWidth.value}px` },
        density: "comfortable"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, {
        id: "mpage",
        class: "px-0"
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
                          ref: "inputRef",
                          modelValue: inputText.value,
                          "onUpdate:modelValue": ($event) => inputText.value = $event,
                          class: "resizable-textarea text-right",
                          label: "輸入框",
                          onPaste: handlePaste
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, {
                            ref: "inputRef",
                            modelValue: inputText.value,
                            "onUpdate:modelValue": ($event) => inputText.value = $event,
                            class: "resizable-textarea text-right",
                            label: "輸入框",
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
                        _push4(`<div class="d-flex flex-column ga-5" data-v-37569c55${_scopeId3}>`);
                        if (convert_type.value === "系辦助理Email" || convert_type.value === "課務承辦人Email") {
                          _push4(ssrRenderComponent(VBtn, {
                            color: "purple-lighten-3 text-grey-darken-4",
                            onClick: copyUniqueEmails,
                            variant: "elevated"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Email `);
                                _push5(ssrRenderComponent(VIcon, {
                                  icon: "mdi-email-multiple-outline",
                                  end: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createTextVNode(" Email "),
                                  createVNode(VIcon, {
                                    icon: "mdi-email-multiple-outline",
                                    end: ""
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
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
                            convert_type.value === "系辦助理Email" || convert_type.value === "課務承辦人Email" ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              color: "purple-lighten-3 text-grey-darken-4",
                              onClick: copyUniqueEmails,
                              variant: "elevated"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Email "),
                                createVNode(VIcon, {
                                  icon: "mdi-email-multiple-outline",
                                  end: ""
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
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
                          ref: "outputRef",
                          modelValue: outputText.value,
                          "onUpdate:modelValue": ($event) => outputText.value = $event,
                          class: "resizable-textarea",
                          label: "輸出框"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextarea, {
                            ref: "outputRef",
                            modelValue: outputText.value,
                            "onUpdate:modelValue": ($event) => outputText.value = $event,
                            class: "resizable-textarea",
                            label: "輸出框"
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
                          ref: "inputRef",
                          modelValue: inputText.value,
                          "onUpdate:modelValue": ($event) => inputText.value = $event,
                          class: "resizable-textarea text-right",
                          label: "輸入框",
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
                          convert_type.value === "系辦助理Email" || convert_type.value === "課務承辦人Email" ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            color: "purple-lighten-3 text-grey-darken-4",
                            onClick: copyUniqueEmails,
                            variant: "elevated"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Email "),
                              createVNode(VIcon, {
                                icon: "mdi-email-multiple-outline",
                                end: ""
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
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
                          ref: "outputRef",
                          modelValue: outputText.value,
                          "onUpdate:modelValue": ($event) => outputText.value = $event,
                          class: "resizable-textarea",
                          label: "輸出框"
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
                        ref: "inputRef",
                        modelValue: inputText.value,
                        "onUpdate:modelValue": ($event) => inputText.value = $event,
                        class: "resizable-textarea text-right",
                        label: "輸入框",
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
                        convert_type.value === "系辦助理Email" || convert_type.value === "課務承辦人Email" ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          color: "purple-lighten-3 text-grey-darken-4",
                          onClick: copyUniqueEmails,
                          variant: "elevated"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Email "),
                            createVNode(VIcon, {
                              icon: "mdi-email-multiple-outline",
                              end: ""
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
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
                        ref: "outputRef",
                        modelValue: outputText.value,
                        "onUpdate:modelValue": ($event) => outputText.value = $event,
                        class: "resizable-textarea",
                        label: "輸出框"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Converters/ClassToOthers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ClassToOthers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37569c55"]]);

export { ClassToOthers as default };
//# sourceMappingURL=ClassToOthers-Bo2B0lpF.mjs.map
