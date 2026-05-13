<template>
  <div>
    <DataTableCRUD
      :title="'班級-系所簡稱對照表維護'"
      :tableTitle="'班級-系所簡稱對照表'"
      :headers="headers"
      :apiUrl="''"
      :apiEndpoints="classDeptshortApiEndpoints"
      :formFields="formFields"
      :itemSingular="'對照規則'"
    />
  </div>
</template>

<script setup>
import DataTableCRUD from "@/components/DataTableCRUD.vue";

definePageMeta({
  layout: "layout1",
});

//
// ✅ ✅ headers（小寫）
//
const headers = [
  {
    value: "id",
    title: "ID",
    sortable: false,
    width: "0px",
    class: "d-none",
    cellClass: "d-none",
  },
  { value: "cls", title: "班級" },
  { value: "dept_s", title: "系所簡稱" },
  { value: "actions", title: "操作", sortable: false },
];

//
// ✅ API
//
const classDeptshortApiEndpoints = {
  get: "/get_map_cls_dept",
  add: "/create_map_cls_dept",
  update: "/update_map_cls_dept/{id}",
  delete: "/delete_map_cls_dept/{id}",
};

const requiredRule = (v) => !!v || "此欄位為必填";

//
// ✅ ✅ formFields（對應後端 cls）
//
const formFields = [
  {
    key: "cls",
    label: "班級",
    type: "text",
    rules: [requiredRule],
  },
  {
    key: "dept_s",
    label: "系所簡稱",
    type: "text",
    rules: [requiredRule],
  },
];
</script>
