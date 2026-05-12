<template>
  <div>
    <!-- 使用 DataTableCRUD 組件並傳遞所需的屬性 -->
    <DataTableCRUD
      :title="'課務承辦人維護'"
      :tableTitle="'課務承辦人'"
      :headers="headers"
      :apiUrl="''"
      :apiEndpoints="cagentApiEndpoints"
      :formFields="cagentFormFields"
      :itemSingular="'承辦人'"
    />
  </div>
</template>

<script setup>
import DataTableCRUD from "../../components/DataTableCRUD.vue";
import { ref } from "vue";

definePageMeta({
  layout: "layout1",
});

// 這裡定義 CagentMaintenance 組件特有的配置
const headers = [
  {
    value: "ID",
    title: "ID",
    sortable: false,
    width: "0px",
    class: "d-none",
    cellClass: "d-none",
  },
  { value: "NAME", title: "姓名" },
  { value: "EXT", title: "分機" },
  { value: "EMAIL", title: "Email" },
  { value: "actions", title: "操作", sortable: false },
];
// CRUD的SERVER端API
const cagentApiEndpoints = {
  get: "/get_cagents",
  add: "/create_cagent",
  update: "/update_cagent/{id}",
  delete: "/delete_cagent/{id}",
};

const requiredRule = (value) => !!value || "此欄位為必填。";

// 定義表單欄位
const cagentFormFields = [
  { key: "NAME", label: "姓名", type: "text", rules: [requiredRule] },
  { key: "EXT", label: "分機", type: "text", rules: [requiredRule] },
  { key: "EMAIL", label: "Email", type: "text", rules: [requiredRule] },
];
</script>
