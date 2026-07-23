import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { D as DataTableCRUD } from './DataTableCRUD-2IFFTx0R.mjs';
import { ref, computed, useSSRContext } from 'vue';
import { u as useNuxtApp } from './server.mjs';
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

const _sfc_main = {
  __name: "DBmaintain",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const dtCrudRef = ref(null);
    const cagentData = ref([]);
    const allHeaders = [
      { value: "id", title: "ID", sortable: false },
      { value: "college", title: "學院全名" },
      { value: "college_s", title: "學院簡稱" },
      { value: "dept", title: "系所全名" },
      { value: "dept_s", title: "系所簡稱" },
      { value: "stype", title: "學制" },
      { value: "agent_name", title: "承辦人" },
      { value: "agent_ext", title: "承辦人分機" },
      { value: "agent_email", title: "承辦人Email" },
      { value: "cagent_name", title: "課務承辦人" },
      { value: "cagent_ext", title: "課務承辦人分機" },
      { value: "cagent_email", title: "課務承辦人Email" },
      { value: "actions", title: "操作", sortable: false }
    ];
    const visibleHeaders = computed(() => allHeaders);
    const departmentApiEndpoints = {
      get: "/get_depts",
      add: "/create_dept",
      update: "/update_dept/{id}",
      delete: "/delete_dept/{id}"
    };
    const requiredRule = (v) => !!v || "此欄位為必填";
    const handleEdit = (item) => {
      if (item.cagent_id) {
        const found = cagentData.value.find((c) => c.id === item.cagent_id);
        if (found) {
          item.cagent_name = found;
        }
      }
    };
    const handleFieldUpdated = ({ key, value }) => {
      if (key === "cagent_name" && value) {
        const edited = dtCrudRef.value.editedItem;
        edited.cagent_id = value.id;
        edited.cagent_name = value.name;
        edited.cagent_ext = value.ext;
        edited.cagent_email = value.email;
      }
    };
    const departmentFormFields = computed(() => [
      { key: "college", label: "學院全名", type: "text", rules: [requiredRule] },
      { key: "college_s", label: "學院簡稱", type: "text", rules: [requiredRule] },
      { key: "dept", label: "系所全名", type: "text", rules: [requiredRule] },
      { key: "dept_s", label: "系所簡稱", type: "text", rules: [requiredRule] },
      { key: "stype", label: "學制", type: "text", rules: [requiredRule] },
      { key: "agent_name", label: "承辦人", type: "text", rules: [requiredRule] },
      {
        key: "agent_ext",
        label: "承辦人分機",
        type: "text",
        rules: [requiredRule]
      },
      {
        key: "agent_email",
        label: "承辦人Email",
        type: "text",
        rules: [requiredRule]
      },
      {
        key: "cagent_name",
        label: "課務承辦人",
        type: "select",
        rules: [requiredRule],
        items: cagentData.value,
        "item-title": "name",
        "return-object": true
      },
      { key: "cagent_id", type: "text", readonly: true },
      { key: "cagent_ext", type: "text", readonly: true },
      { key: "cagent_email", type: "text", readonly: true }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DataTableCRUD, {
        ref_key: "dtCrudRef",
        ref: dtCrudRef,
        title: "系所表維護",
        tableTitle: "系所表",
        headers: visibleHeaders.value,
        apiUrl: "",
        apiEndpoints: departmentApiEndpoints,
        formFields: departmentFormFields.value,
        itemSingular: "系所",
        onOnEdit: handleEdit,
        onFieldUpdated: handleFieldUpdated
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/DB/DBmaintain.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DBmaintain-CC27KPB3.mjs.map
