<template>
  <div>
    <DataTableCRUD
      :title="'帳號管理'"
      :tableTitle="'使用者列表'"
      :headers="headers"
      :apiUrl="''"
      :apiEndpoints="memberApiEndpoints"
      :formFields="formFields"
      :itemSingular="'使用者'"
    />
  </div>
</template>

<script setup>
import DataTableCRUD from "@/components/DataTableCRUD.vue";

definePageMeta({
  layout: "layout1",
});

//
// ✅ 表格欄位
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
  { value: "account", title: "帳號" },
  { value: "name", title: "姓名" },
  { value: "auth", title: "權限" },
  { value: "actions", title: "操作", sortable: false },
];

//
// ✅ API endpoints（對應你後端）
//
const memberApiEndpoints = {
  get: "/get_members",
  add: "/create_member",
  update: "/update_member/{id}",
  delete: "/delete_member/{id}",
};

//
// ✅ 表單驗證
//
const requiredRule = (v) => !!v || "此欄位為必填";

//
// ✅ 表單欄位
//
const formFields = [
  {
    key: "account",
    label: "帳號",
    type: "text",
    rules: [requiredRule],
  },
  {
    key: "pwd",
    label: "密碼",
    type: "text", // 👉 明碼（你目前設計）
    rules: [requiredRule],
  },
  {
    key: "name",
    label: "姓名",
    type: "text",
    rules: [requiredRule],
  },
  {
    key: "auth",
    label: "權限",
    type: "select",
    items: ["admin", "curri", "user", "guest"], // ✅ 權限下拉選
    rules: [requiredRule],
  },
];
</script>
