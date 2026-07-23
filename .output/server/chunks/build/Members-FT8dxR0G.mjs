import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { D as DataTableCRUD } from './DataTableCRUD-2IFFTx0R.mjs';
import { useSSRContext } from 'vue';
import './server.mjs';
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
import './VCard-BqUhiF6T.mjs';
import './dimensions-B7KURZuc.mjs';
import './index-DVrSdyte.mjs';
import './VBtn-CygXX-_7.mjs';
import './VTextField-B7wWYftJ.mjs';
import './autofocus-DcW6hXk9.mjs';
import './index-Cr-Vuh5O.mjs';
import './forwardRefs-CJyhXHYH.mjs';
import './VSelect-Cq2H4SIe.mjs';
import './VList-7bIncbX4.mjs';
import './VListItem-BmLTdZa_.mjs';
import './ssrBoot-ZQn7gOuX.mjs';
import './VDivider-BEUbRpXn.mjs';
import './VMenu-CPs0p4-G.mjs';
import './VSnackbar-XEOvONhh.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './lazy-DuD9WWOI.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './layout-BYmWGd6C.mjs';
import './VSelectionControl-CKFGRvJp.mjs';
import './VChip-F7YMK5qF.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';
import './VDialog-DhJf4vpZ.mjs';
import './VContainer-BWwOr7CB.mjs';
import './VRow-BBOgihbN.mjs';
import './VSpacer-C9EBCiip.mjs';

const _sfc_main = {
  __name: "Members",
  __ssrInlineRender: true,
  setup(__props) {
    const headers = [
      {
        value: "id",
        title: "ID",
        sortable: false,
        width: "0px",
        class: "d-none",
        cellClass: "d-none"
      },
      { value: "account", title: "帳號" },
      { value: "name", title: "姓名" },
      { value: "auth", title: "權限" },
      { value: "actions", title: "操作", sortable: false }
    ];
    const memberApiEndpoints = {
      get: "/get_members",
      add: "/create_member",
      update: "/update_member/{id}",
      delete: "/delete_member/{id}"
    };
    const requiredRule = (v) => !!v || "此欄位為必填";
    const formFields = [
      {
        key: "account",
        label: "帳號",
        type: "text",
        rules: [requiredRule]
      },
      {
        key: "pwd",
        label: "密碼",
        type: "text",
        // 👉 明碼（你目前設計）
        rules: [requiredRule]
      },
      {
        key: "name",
        label: "姓名",
        type: "text",
        rules: [requiredRule]
      },
      {
        key: "auth",
        label: "權限",
        type: "select",
        items: ["admin", "curri", "user", "guest"],
        // ✅ 權限下拉選
        rules: [requiredRule]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DataTableCRUD, {
        title: "帳號管理",
        tableTitle: "使用者列表",
        headers,
        apiUrl: "",
        apiEndpoints: memberApiEndpoints,
        formFields,
        itemSingular: "使用者"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/DB/Members.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Members-FT8dxR0G.mjs.map
