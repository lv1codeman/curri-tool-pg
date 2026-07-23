import { ref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { V as VCard } from './VCard-BqUhiF6T.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VSnackbar } from './VSnackbar-XEOvONhh.mjs';
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
import './dimensions-B7KURZuc.mjs';
import './forwardRefs-CJyhXHYH.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './layout-BYmWGd6C.mjs';

const _sfc_main$1 = {
  __name: "CopyCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  emits: ["copy"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        hover: "",
        class: "mx-auto cursor-pointer",
        title: __props.title,
        subtitle: __props.subtitle,
        onClick: ($event) => _ctx.$emit("copy", __props.subtitle)
      }, _attrs), {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-content-copy",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-content-copy",
                size: "small",
                color: "grey"
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CopyCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CopyCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-925a3d72"]]);
const _sfc_main = {
  __name: "Minecraft",
  __ssrInlineRender: true,
  setup(__props) {
    const mcCommands = [
      {
        title: "要塞（Stronghold）",
        command: "/locate structure minecraft:stronghold"
      },
      {
        title: "堡壘遺跡（Bastion Remnant）",
        command: "/locate structure minecraft:bastion_remnant"
      },
      {
        title: "地獄堡壘（Nether Fortress）",
        command: "/locate structure minecraft:fortress"
      },
      {
        title: "扭曲森林（Warped Forest)",
        command: "/locate biome minecraft:warped_forest"
      }
      // 你可以輕鬆地繼續增加，例如：
      // { title: "末地城 (End City)", command: "/locate structure minecraft:end_city" }
    ];
    const snackbar = ref(false);
    const snackbarText = ref("");
    async function copyCode(codeToCopy) {
      try {
        await (void 0).clipboard.writeText(codeToCopy);
        snackbarText.value = "✅ 指令已成功複製到剪貼簿！";
        snackbar.value = true;
      } catch (err) {
        console.error("無法複製文字:", err);
        snackbarText.value = "❌ 複製失敗，請手動複製。";
        snackbar.value = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(mcCommands, (item, index) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: index,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(CopyCard, {
                            title: item.title,
                            subtitle: item.command,
                            onCopy: ($event) => copyCode($event),
                            class: "h-100"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(CopyCard, {
                              title: item.title,
                              subtitle: item.command,
                              onCopy: ($event) => copyCode($event),
                              class: "h-100"
                            }, null, 8, ["title", "subtitle", "onCopy"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(mcCommands, (item, index) => {
                      return createVNode(VCol, {
                        key: index,
                        cols: "12",
                        sm: "6",
                        md: "4",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(CopyCard, {
                            title: item.title,
                            subtitle: item.command,
                            onCopy: ($event) => copyCode($event),
                            class: "h-100"
                          }, null, 8, ["title", "subtitle", "onCopy"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(mcCommands, (item, index) => {
                    return createVNode(VCol, {
                      key: index,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(CopyCard, {
                          title: item.title,
                          subtitle: item.command,
                          onCopy: ($event) => copyCode($event),
                          class: "h-100"
                        }, null, 8, ["title", "subtitle", "onCopy"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 64))
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
        color: "success",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Sixer/Minecraft.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Minecraft = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a36466d5"]]);

export { Minecraft as default };
//# sourceMappingURL=Minecraft-CjKzHPoR.mjs.map
