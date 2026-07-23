import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { V as VCard } from './VCard-BqUhiF6T.mjs';
import { V as VIcon } from './index-DVrSdyte.mjs';
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

const _sfc_main = {
  __name: "info",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card-grid-container" }, _attrs))} data-v-eed14d98><div class="card-grid" data-v-eed14d98>`);
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "行事曆",
        subtitle: "各學年度行事曆",
        href: "https://acadaff.ncue.edu.tw/p/412-1002-2143.php?Lang=zh-tw",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "跨校修課優惠一覽表",
        subtitle: "「臺灣國立大學系統」及「彰雲嘉大學校院聯盟」跨校修課優惠一覽表",
        href: "https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/691174704.pdf",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "開設科目更正表(前台)",
        subtitle: "課務組前台(需登入gm信箱)",
        href: "https://acadaff.ncue.edu.tw/var/file/2/1002/img/1013/coursereview.html",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "開設科目更正表(後台)",
        subtitle: "課務組後台(需登入gm信箱)",
        href: "https://docs.google.com/spreadsheets/d/19CMRhHc12KVf6ntq75oao-jOjIk4GgGvEgWqBp2C7L0/edit?gid=1708200949#gid=1708200949",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "課務組NAS",
        subtitle: "課務組雲端",
        href: "http://10.22.2.164:8080/cgi-bin/",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "NCUE通訊錄",
        subtitle: "需登入單一簽入",
        href: "https://portal.ncue.edu.tw/portal/contacts/",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "教務處網站(前台)",
        subtitle: "RPAGE",
        href: "https://acadaff.ncue.edu.tw",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "教務處網站(後台)",
        subtitle: "需登入",
        href: "https://acadaff.ncue.edu.tw/platform/",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "學生入口",
        subtitle: "每學期選課時程",
        href: "https://webap2s.ncue.edu.tw/curri/stuEntry.html",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "學程檢核平台",
        subtitle: "圖資處家維製作",
        href: "https://webap1.ncue.edu.tw/PRO/",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "模擬學生",
        subtitle: "需設定IP",
        href: "https://webapss.ncue.edu.tw/Student/baseuser/login_ori",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer card-group-color",
        title: "模擬老師",
        subtitle: "需設定IP",
        href: "https://webapss.ncue.edu.tw/Teacher/baseuser/login_ori",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "台灣銀行學雜費入口網",
        subtitle: "查詢學生繳費",
        href: "https://school.bot.com.tw/newTwbank/StudentLogin.aspx?id=Student",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        class: "card-item cursor-pointer",
        title: "校園資訊服務入口",
        subtitle: "單一簽入",
        href: "https://portal.ncue.edu.tw/portal/home.php",
        target: "_blank"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: "mdi-link",
              size: "small",
              color: "grey"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VIcon, {
                icon: "mdi-link",
                size: "small",
                color: "grey"
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Info/info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const info = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eed14d98"]]);

export { info as default };
//# sourceMappingURL=info-DELAyS_R.mjs.map
