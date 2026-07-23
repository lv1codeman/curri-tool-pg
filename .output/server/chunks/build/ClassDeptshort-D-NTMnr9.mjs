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
  __name: "ClassDeptshort",
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
      { value: "cls", title: "班級" },
      { value: "dept_s", title: "系所簡稱" },
      { value: "actions", title: "操作", sortable: false }
    ];
    const classDeptshortApiEndpoints = {
      get: "/get_map_cls_dept",
      add: "/create_map_cls_dept",
      update: "/update_map_cls_dept/{id}",
      delete: "/delete_map_cls_dept/{id}"
    };
    const requiredRule = (v) => !!v || "此欄位為必填";
    const formFields = [
      {
        key: "cls",
        label: "班級",
        type: "text",
        rules: [requiredRule]
      },
      {
        key: "dept_s",
        label: "系所簡稱",
        type: "text",
        rules: [requiredRule]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DataTableCRUD, {
        title: "班級-系所簡稱對照表維護",
        tableTitle: "班級-系所簡稱對照表",
        headers,
        apiUrl: "",
        apiEndpoints: classDeptshortApiEndpoints,
        formFields,
        itemSingular: "對照規則"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/DB/ClassDeptshort.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ClassDeptshort-D-NTMnr9.mjs.map
