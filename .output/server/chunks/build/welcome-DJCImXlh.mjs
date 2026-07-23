import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VCard, c as VCardText, a as VCardTitle } from './VCard-BqUhiF6T.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
import { V as VDivider } from './VDivider-BEUbRpXn.mjs';
import { V as VAlert } from './VAlert-jyf7tndU.mjs';
import { V as VListItem, a as VListItemTitle, b as VListItemSubtitle } from './VListItem-BmLTdZa_.mjs';
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
import './VBtn-CygXX-_7.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "welcome",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const user = ref(null);
    const alertTypeMap = {
      loading: "info",
      success: "success",
      error: "error"
    };
    const serverStatus = ref("loading");
    const serverMessage = ref("正在檢查伺服器連線狀態...");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        class: "pa-0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "elevation-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<h1 class="text-h4 mb-2 d-flex align-center" data-v-7ac6a7d6${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VIcon, {
                                      color: "primary",
                                      size: "36",
                                      class: "mr-3"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`mdi-office-building-cog`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-office-building-cog")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(` 課務輔助工具系統 </h1>`);
                                    if (user.value) {
                                      _push6(`<p class="text-h6 text-grey-darken-2" data-v-7ac6a7d6${_scopeId5}> 歡迎回來，<span class="font-weight-bold text-primary" data-v-7ac6a7d6${_scopeId5}>${ssrInterpolate(user.value.name)}</span>！ <span class="text-subtitle-1 ml-2 text-medium-emphasis" data-v-7ac6a7d6${_scopeId5}> (您的權限等級: ${ssrInterpolate(user.value.auth)}) </span></p>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(VDivider, { class: "my-3" }, null, _parent6, _scopeId5));
                                    _push6(`<p class="text-subtitle-1" data-v-7ac6a7d6${_scopeId5}> 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 </p>`);
                                  } else {
                                    return [
                                      createVNode("h1", { class: "text-h4 mb-2 d-flex align-center" }, [
                                        createVNode(VIcon, {
                                          color: "primary",
                                          size: "36",
                                          class: "mr-3"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-office-building-cog")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 課務輔助工具系統 ")
                                      ]),
                                      user.value ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-h6 text-grey-darken-2"
                                      }, [
                                        createTextVNode(" 歡迎回來，"),
                                        createVNode("span", { class: "font-weight-bold text-primary" }, toDisplayString(user.value.name), 1),
                                        createTextVNode("！ "),
                                        createVNode("span", { class: "text-subtitle-1 ml-2 text-medium-emphasis" }, " (您的權限等級: " + toDisplayString(user.value.auth) + ") ", 1)
                                      ])) : createCommentVNode("", true),
                                      createVNode(VDivider, { class: "my-3" }),
                                      createVNode("p", { class: "text-subtitle-1" }, " 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode("h1", { class: "text-h4 mb-2 d-flex align-center" }, [
                                      createVNode(VIcon, {
                                        color: "primary",
                                        size: "36",
                                        class: "mr-3"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-office-building-cog")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 課務輔助工具系統 ")
                                    ]),
                                    user.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-h6 text-grey-darken-2"
                                    }, [
                                      createTextVNode(" 歡迎回來，"),
                                      createVNode("span", { class: "font-weight-bold text-primary" }, toDisplayString(user.value.name), 1),
                                      createTextVNode("！ "),
                                      createVNode("span", { class: "text-subtitle-1 ml-2 text-medium-emphasis" }, " (您的權限等級: " + toDisplayString(user.value.auth) + ") ", 1)
                                    ])) : createCommentVNode("", true),
                                    createVNode(VDivider, { class: "my-3" }),
                                    createVNode("p", { class: "text-subtitle-1" }, " 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 ")
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
                          createVNode(VCard, { class: "elevation-3" }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode("h1", { class: "text-h4 mb-2 d-flex align-center" }, [
                                    createVNode(VIcon, {
                                      color: "primary",
                                      size: "36",
                                      class: "mr-3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-office-building-cog")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 課務輔助工具系統 ")
                                  ]),
                                  user.value ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-h6 text-grey-darken-2"
                                  }, [
                                    createTextVNode(" 歡迎回來，"),
                                    createVNode("span", { class: "font-weight-bold text-primary" }, toDisplayString(user.value.name), 1),
                                    createTextVNode("！ "),
                                    createVNode("span", { class: "text-subtitle-1 ml-2 text-medium-emphasis" }, " (您的權限等級: " + toDisplayString(user.value.auth) + ") ", 1)
                                  ])) : createCommentVNode("", true),
                                  createVNode(VDivider, { class: "my-3" }),
                                  createVNode("p", { class: "text-subtitle-1" }, " 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 ")
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "pa-4 elevation-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      class: "mr-2",
                                      color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(` 伺服器狀態 `);
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        class: "mr-2",
                                        color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["color"]),
                                      createTextVNode(" 伺服器狀態 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAlert, {
                                      type: alertTypeMap[serverStatus.value],
                                      density: "compact",
                                      variant: "tonal",
                                      title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(serverMessage.value)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(serverMessage.value), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VAlert, {
                                        type: alertTypeMap[serverStatus.value],
                                        density: "compact",
                                        variant: "tonal",
                                        title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(serverMessage.value), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["type", "title"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "mr-2",
                                      color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["color"]),
                                    createTextVNode(" 伺服器狀態 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VAlert, {
                                      type: alertTypeMap[serverStatus.value],
                                      density: "compact",
                                      variant: "tonal",
                                      title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(serverMessage.value), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["type", "title"])
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
                          createVNode(VCard, { class: "pa-4 elevation-2" }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "mr-2",
                                    color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"]),
                                  createTextVNode(" 伺服器狀態 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VAlert, {
                                    type: alertTypeMap[serverStatus.value],
                                    density: "compact",
                                    variant: "tonal",
                                    title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(serverMessage.value), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["type", "title"])
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
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "elevation-3" }, {
                          default: withCtx(() => [
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("h1", { class: "text-h4 mb-2 d-flex align-center" }, [
                                  createVNode(VIcon, {
                                    color: "primary",
                                    size: "36",
                                    class: "mr-3"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-office-building-cog")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 課務輔助工具系統 ")
                                ]),
                                user.value ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-h6 text-grey-darken-2"
                                }, [
                                  createTextVNode(" 歡迎回來，"),
                                  createVNode("span", { class: "font-weight-bold text-primary" }, toDisplayString(user.value.name), 1),
                                  createTextVNode("！ "),
                                  createVNode("span", { class: "text-subtitle-1 ml-2 text-medium-emphasis" }, " (您的權限等級: " + toDisplayString(user.value.auth) + ") ", 1)
                                ])) : createCommentVNode("", true),
                                createVNode(VDivider, { class: "my-3" }),
                                createVNode("p", { class: "text-subtitle-1" }, " 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "pa-4 elevation-2" }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "mr-2",
                                  color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["color"]),
                                createTextVNode(" 伺服器狀態 ")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VAlert, {
                                  type: alertTypeMap[serverStatus.value],
                                  density: "compact",
                                  variant: "tonal",
                                  title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(serverMessage.value), 1)
                                  ]),
                                  _: 1
                                }, 8, ["type", "title"])
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Info/Info",
                          color: "blue-grey-lighten-5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, { "three-line": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "blue-grey-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-information`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-information")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` 資料速查 `);
                                        } else {
                                          return [
                                            createVNode(VIcon, {
                                              color: "blue-grey-darken-2",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-information")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 資料速查 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VListItemSubtitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 課務相關資料速查 `);
                                        } else {
                                          return [
                                            createTextVNode(" 課務相關資料速查 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            color: "blue-grey-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-information")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" 資料速查 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VListItemSubtitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" 課務相關資料速查 ")
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
                                createVNode(VListItem, { "three-line": "" }, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          color: "blue-grey-darken-2",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-information")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 資料速查 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VListItemSubtitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" 課務相關資料速查 ")
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
                          createVNode(VCard, {
                            class: "pa-4 quick-entry-card",
                            elevation: "3",
                            link: "",
                            to: "/Info/Info",
                            color: "blue-grey-lighten-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, { "three-line": "" }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        color: "blue-grey-darken-2",
                                        class: "mr-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-information")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 資料速查 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VListItemSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" 課務相關資料速查 ")
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Converters/ClassToOthers",
                          color: "indigo-lighten-5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, { "three-line": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "indigo-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-file-swap`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-file-swap")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` 班級簡稱轉換 `);
                                        } else {
                                          return [
                                            createVNode(VIcon, {
                                              color: "indigo-darken-2",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-file-swap")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 班級簡稱轉換 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VListItemSubtitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 快速轉換班級代碼至各種簡稱格式。 `);
                                        } else {
                                          return [
                                            createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            color: "indigo-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-file-swap")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" 班級簡稱轉換 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VListItemSubtitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
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
                                createVNode(VListItem, { "three-line": "" }, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          color: "indigo-darken-2",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-file-swap")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 班級簡稱轉換 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VListItemSubtitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
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
                          createVNode(VCard, {
                            class: "pa-4 quick-entry-card",
                            elevation: "3",
                            link: "",
                            to: "/Converters/ClassToOthers",
                            color: "indigo-lighten-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, { "three-line": "" }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        color: "indigo-darken-2",
                                        class: "mr-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-file-swap")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 班級簡稱轉換 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VListItemSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/DB/CurriAgent",
                          color: "green-lighten-5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, { "three-line": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "green-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-account-edit`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-account-edit")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` 課務承辦維護 `);
                                        } else {
                                          return [
                                            createVNode(VIcon, {
                                              color: "green-darken-2",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-account-edit")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 課務承辦維護 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VListItemSubtitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 維護各部門課務承辦人員的資訊。 `);
                                        } else {
                                          return [
                                            createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            color: "green-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-account-edit")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" 課務承辦維護 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VListItemSubtitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
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
                                createVNode(VListItem, { "three-line": "" }, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          color: "green-darken-2",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-account-edit")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 課務承辦維護 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VListItemSubtitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
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
                          createVNode(VCard, {
                            class: "pa-4 quick-entry-card",
                            elevation: "3",
                            link: "",
                            to: "/DB/CurriAgent",
                            color: "green-lighten-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, { "three-line": "" }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        color: "green-darken-2",
                                        class: "mr-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-account-edit")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 課務承辦維護 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VListItemSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Tools/YTconverter",
                          color: "orange-lighten-5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, { "three-line": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "orange-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-tools`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-tools")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` 其他工具 `);
                                        } else {
                                          return [
                                            createVNode(VIcon, {
                                              color: "orange-darken-2",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-tools")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 其他工具 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VListItemSubtitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Youtube 影片下載及其他輔助功能。 `);
                                        } else {
                                          return [
                                            createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            color: "orange-darken-2",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-tools")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" 其他工具 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VListItemSubtitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
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
                                createVNode(VListItem, { "three-line": "" }, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          color: "orange-darken-2",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-tools")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 其他工具 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VListItemSubtitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
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
                          createVNode(VCard, {
                            class: "pa-4 quick-entry-card",
                            elevation: "3",
                            link: "",
                            to: "/Tools/YTconverter",
                            color: "orange-lighten-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItem, { "three-line": "" }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        color: "orange-darken-2",
                                        class: "mr-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-tools")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 其他工具 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VListItemSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
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
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Info/Info",
                          color: "blue-grey-lighten-5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, { "three-line": "" }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      color: "blue-grey-darken-2",
                                      class: "mr-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-information")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 資料速查 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" 課務相關資料速查 ")
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
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Converters/ClassToOthers",
                          color: "indigo-lighten-5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, { "three-line": "" }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      color: "indigo-darken-2",
                                      class: "mr-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-file-swap")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 班級簡稱轉換 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
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
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/DB/CurriAgent",
                          color: "green-lighten-5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, { "three-line": "" }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      color: "green-darken-2",
                                      class: "mr-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-account-edit")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 課務承辦維護 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
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
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "pa-4 quick-entry-card",
                          elevation: "3",
                          link: "",
                          to: "/Tools/YTconverter",
                          color: "orange-lighten-5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItem, { "three-line": "" }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      color: "orange-darken-2",
                                      class: "mr-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-tools")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 其他工具 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
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
            if (user.value) {
              _push2(ssrRenderComponent(VRow, { class: "mt-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, { class: "pa-4 elevation-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VIcon, {
                                        class: "mr-2",
                                        color: "warning"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`mdi-bullhorn`);
                                          } else {
                                            return [
                                              createTextVNode("mdi-bullhorn")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(` 系統公告 `);
                                    } else {
                                      return [
                                        createVNode(VIcon, {
                                          class: "mr-2",
                                          color: "warning"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-bullhorn")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 系統公告 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardText, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VAlert, {
                                        type: "info",
                                        density: "compact",
                                        variant: "tonal",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` [2025-11-20] 資料庫連線已修復，登入服務正常運行。 `);
                                          } else {
                                            return [
                                              createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VAlert, {
                                        type: "success",
                                        density: "compact",
                                        variant: "tonal"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` 系統更新：班級簡稱轉換工具新增批次處理模式。 `);
                                          } else {
                                            return [
                                              createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VAlert, {
                                          type: "info",
                                          density: "compact",
                                          variant: "tonal",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VAlert, {
                                          type: "success",
                                          density: "compact",
                                          variant: "tonal"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
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
                                  createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        class: "mr-2",
                                        color: "warning"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-bullhorn")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 系統公告 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VAlert, {
                                        type: "info",
                                        density: "compact",
                                        variant: "tonal",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VAlert, {
                                        type: "success",
                                        density: "compact",
                                        variant: "tonal"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
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
                            createVNode(VCard, { class: "pa-4 elevation-2" }, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "mr-2",
                                      color: "warning"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-bullhorn")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 系統公告 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VAlert, {
                                      type: "info",
                                      density: "compact",
                                      variant: "tonal",
                                      class: "mb-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VAlert, {
                                      type: "success",
                                      density: "compact",
                                      variant: "tonal"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
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
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { class: "pa-4 elevation-2" }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "mr-2",
                                    color: "warning"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-bullhorn")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 系統公告 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VAlert, {
                                    type: "info",
                                    density: "compact",
                                    variant: "tonal",
                                    class: "mb-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VAlert, {
                                    type: "success",
                                    density: "compact",
                                    variant: "tonal"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
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
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "elevation-3" }, {
                        default: withCtx(() => [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "text-h4 mb-2 d-flex align-center" }, [
                                createVNode(VIcon, {
                                  color: "primary",
                                  size: "36",
                                  class: "mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-office-building-cog")
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" 課務輔助工具系統 ")
                              ]),
                              user.value ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-h6 text-grey-darken-2"
                              }, [
                                createTextVNode(" 歡迎回來，"),
                                createVNode("span", { class: "font-weight-bold text-primary" }, toDisplayString(user.value.name), 1),
                                createTextVNode("！ "),
                                createVNode("span", { class: "text-subtitle-1 ml-2 text-medium-emphasis" }, " (您的權限等級: " + toDisplayString(user.value.auth) + ") ", 1)
                              ])) : createCommentVNode("", true),
                              createVNode(VDivider, { class: "my-3" }),
                              createVNode("p", { class: "text-subtitle-1" }, " 本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "pa-4 elevation-2" }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                class: "mr-2",
                                color: serverStatus.value === "success" ? "success" : serverStatus.value === "error" ? "error" : "grey"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(serverStatus.value === "success" ? "mdi-server-network" : serverStatus.value === "error" ? "mdi-server-network-off" : "mdi-sync"), 1)
                                ]),
                                _: 1
                              }, 8, ["color"]),
                              createTextVNode(" 伺服器狀態 ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VAlert, {
                                type: alertTypeMap[serverStatus.value],
                                density: "compact",
                                variant: "tonal",
                                title: serverStatus.value === "success" ? "正常運行" : serverStatus.value === "error" ? "連線失敗" : "檢查中..."
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(serverMessage.value), 1)
                                ]),
                                _: 1
                              }, 8, ["type", "title"])
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
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "pa-4 quick-entry-card",
                        elevation: "3",
                        link: "",
                        to: "/Info/Info",
                        color: "blue-grey-lighten-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, { "three-line": "" }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    color: "blue-grey-darken-2",
                                    class: "mr-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-information")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 資料速查 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VListItemSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(" 課務相關資料速查 ")
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
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "pa-4 quick-entry-card",
                        elevation: "3",
                        link: "",
                        to: "/Converters/ClassToOthers",
                        color: "indigo-lighten-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, { "three-line": "" }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    color: "indigo-darken-2",
                                    class: "mr-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-file-swap")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 班級簡稱轉換 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VListItemSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(" 快速轉換班級代碼至各種簡稱格式。 ")
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
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "pa-4 quick-entry-card",
                        elevation: "3",
                        link: "",
                        to: "/DB/CurriAgent",
                        color: "green-lighten-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, { "three-line": "" }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    color: "green-darken-2",
                                    class: "mr-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-account-edit")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 課務承辦維護 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VListItemSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(" 維護各部門課務承辦人員的資訊。 ")
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
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "pa-4 quick-entry-card",
                        elevation: "3",
                        link: "",
                        to: "/Tools/YTconverter",
                        color: "orange-lighten-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItem, { "three-line": "" }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, { class: "text-h6 mb-1" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    color: "orange-darken-2",
                                    class: "mr-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-tools")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 其他工具 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VListItemSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Youtube 影片下載及其他輔助功能。 ")
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
              }),
              user.value ? (openBlock(), createBlock(VRow, {
                key: 0,
                class: "mt-4"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "pa-4 elevation-2" }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h6 d-flex align-center" }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                class: "mr-2",
                                color: "warning"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-bullhorn")
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 系統公告 ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VAlert, {
                                type: "info",
                                density: "compact",
                                variant: "tonal",
                                class: "mb-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" [2025-11-20] 資料庫連線已修復，登入服務正常運行。 ")
                                ]),
                                _: 1
                              }),
                              createVNode(VAlert, {
                                type: "success",
                                density: "compact",
                                variant: "tonal"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 系統更新：班級簡稱轉換工具新增批次處理模式。 ")
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
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const welcome = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ac6a7d6"]]);

export { welcome as default };
//# sourceMappingURL=welcome-DJCImXlh.mjs.map
