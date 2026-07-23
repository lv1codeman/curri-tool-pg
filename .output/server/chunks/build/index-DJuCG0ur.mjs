import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode, withKeys, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp, a as useUser, n as navigateTo } from './server.mjs';
import { V as VCard, a as VCardTitle, b as VCardSubtitle, c as VCardText, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VAlert } from './VAlert-jyf7tndU.mjs';
import { V as VTextField } from './VTextField-B7wWYftJ.mjs';
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
import './index-DVrSdyte.mjs';
import './autofocus-DcW6hXk9.mjs';
import './index-Cr-Vuh5O.mjs';
import './forwardRefs-CJyhXHYH.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const { setUser } = useUser();
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    async function login() {
      if (!username.value || !password.value) return;
      loading.value = true;
      error.value = "";
      try {
        const res = await $curridataAPI.post("/api/user_login", {
          username: username.value,
          password: password.value
        });
        const token = res.data.access_token;
        const user = res.data.user;
        setUser(
          {
            id: user.id,
            name: user.name,
            auth: user.auth,
            username: username.value
          },
          token
        );
        redirectByRole(user.auth);
      } catch (err) {
        console.error(err);
        error.value = err.response?.data?.detail || "登入失敗，請確認帳號密碼";
      } finally {
        loading.value = false;
      }
    }
    function redirectByRole(role) {
      return navigateTo("/welcome");
    }
    function clear() {
      username.value = "";
      password.value = "";
      error.value = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "d-flex justify-center align-center bg-grey-lighten-4",
        style: { "height": "100vh" }
      }, _attrs))} data-v-73b9254a>`);
      _push(ssrRenderComponent(VCard, {
        class: "login-card rounded-lg pa-2",
        width: "420",
        elevation: "6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 請輸入帳密登入 `);
                } else {
                  return [
                    createTextVNode(" 請輸入帳密登入 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 本系統使用 Neon 雲端資料庫 `);
                } else {
                  return [
                    createTextVNode(" 本系統使用 Neon 雲端資料庫 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardSubtitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 資料庫久未使用會睡眠，登入約需等候 20~30 秒 `);
                } else {
                  return [
                    createTextVNode(" 資料庫久未使用會睡眠，登入約需等候 20~30 秒 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, { class: "pt-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (error.value) {
                    _push3(ssrRenderComponent(VAlert, {
                      type: "error",
                      density: "compact",
                      class: "mb-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(error.value)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(error.value), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: username.value,
                    "onUpdate:modelValue": ($event) => username.value = $event,
                    label: "帳號 (ACCOUNT)",
                    "prepend-inner-icon": "mdi-account",
                    variant: "outlined",
                    density: "compact",
                    disabled: loading.value,
                    onKeyup: login
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    label: "密碼 (PWD)",
                    type: "password",
                    "prepend-inner-icon": "mdi-lock",
                    variant: "outlined",
                    density: "compact",
                    disabled: loading.value,
                    onKeyup: login
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    error.value ? (openBlock(), createBlock(VAlert, {
                      key: 0,
                      type: "error",
                      density: "compact",
                      class: "mb-3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(error.value), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(VTextField, {
                      modelValue: username.value,
                      "onUpdate:modelValue": ($event) => username.value = $event,
                      label: "帳號 (ACCOUNT)",
                      "prepend-inner-icon": "mdi-account",
                      variant: "outlined",
                      density: "compact",
                      disabled: loading.value,
                      onKeyup: withKeys(login, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                    createVNode(VTextField, {
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      label: "密碼 (PWD)",
                      type: "password",
                      "prepend-inner-icon": "mdi-lock",
                      variant: "outlined",
                      density: "compact",
                      disabled: loading.value,
                      onKeyup: withKeys(login, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardActions, { class: "d-flex justify-end" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    color: "error",
                    variant: "text",
                    onClick: clear,
                    disabled: loading.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 清空 `);
                      } else {
                        return [
                          createTextVNode(" 清空 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    color: "primary",
                    loading: loading.value,
                    variant: "flat",
                    onClick: login,
                    disabled: !username.value || !password.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 確認登入 `);
                      } else {
                        return [
                          createTextVNode(" 確認登入 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      color: "error",
                      variant: "text",
                      onClick: clear,
                      disabled: loading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 清空 ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(VBtn, {
                      color: "primary",
                      loading: loading.value,
                      variant: "flat",
                      onClick: login,
                      disabled: !username.value || !password.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 確認登入 ")
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => [
                  createTextVNode(" 請輸入帳密登入 ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode(" 本系統使用 Neon 雲端資料庫 ")
                ]),
                _: 1
              }),
              createVNode(VCardSubtitle, null, {
                default: withCtx(() => [
                  createTextVNode(" 資料庫久未使用會睡眠，登入約需等候 20~30 秒 ")
                ]),
                _: 1
              }),
              createVNode(VCardText, { class: "pt-4" }, {
                default: withCtx(() => [
                  error.value ? (openBlock(), createBlock(VAlert, {
                    key: 0,
                    type: "error",
                    density: "compact",
                    class: "mb-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(error.value), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(VTextField, {
                    modelValue: username.value,
                    "onUpdate:modelValue": ($event) => username.value = $event,
                    label: "帳號 (ACCOUNT)",
                    "prepend-inner-icon": "mdi-account",
                    variant: "outlined",
                    density: "compact",
                    disabled: loading.value,
                    onKeyup: withKeys(login, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                  createVNode(VTextField, {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    label: "密碼 (PWD)",
                    type: "password",
                    "prepend-inner-icon": "mdi-lock",
                    variant: "outlined",
                    density: "compact",
                    disabled: loading.value,
                    onKeyup: withKeys(login, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              createVNode(VCardActions, { class: "d-flex justify-end" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "error",
                    variant: "text",
                    onClick: clear,
                    disabled: loading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 清空 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(VBtn, {
                    color: "primary",
                    loading: loading.value,
                    variant: "flat",
                    onClick: login,
                    disabled: !username.value || !password.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 確認登入 ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73b9254a"]]);

export { index as default };
//# sourceMappingURL=index-DJuCG0ur.mjs.map
