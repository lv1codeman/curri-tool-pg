<template>
  <div>
    <DataTableCRUD
      ref="dtCrudRef"
      :title="'系所表維護'"
      :tableTitle="'系所表'"
      :headers="visibleHeaders"
      :apiUrl="''"
      :apiEndpoints="departmentApiEndpoints"
      :formFields="departmentFormFields"
      :itemSingular="'系所'"
      @on-edit="handleEdit"
      @field-updated="handleFieldUpdated"
    />
  </div>
</template>

<script setup>
import DataTableCRUD from "@/components/DataTableCRUD.vue";
import { ref, onMounted, computed, reactive } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "layout1",
});

const { $curridataAPI } = useNuxtApp();

// -----------------
// 狀態變數
// -----------------
const dtCrudRef = ref(null);
const editedItem = reactive({});
const cagentData = ref([]);

// -----------------
// 表格標頭設定
// -----------------
const allHeaders = [
  {
    value: "ID",
    title: "ID",
    sortable: false,
    width: "0px",
  },
  {
    value: "CAGENT_ID",
    title: "課務承辦人ID",
    sortable: false,
    width: "0px",
  },
  {
    value: "AGENT_ID",
    title: "承辦人ID",
    sortable: false,
    width: "0px",
  },
  { value: "COLLEGE", title: "學院全名" },
  { value: "COLLEGE_S", title: "學院簡稱" },
  { value: "DEPT", title: "系所全名" },
  { value: "DEPT_S", title: "系所簡稱" },
  { value: "STYPE", title: "學制" },
  { value: "AGENT_NAME", title: "承辦人" },
  { value: "AGENT_EXT", title: "承辦人分機" },
  { value: "AGENT_EMAIL", title: "承辦人Email" },
  { value: "CAGENT_NAME", title: "課務承辦人" },
  { value: "CAGENT_EXT", title: "課務承辦人分機" },
  { value: "CAGENT_EMAIL", title: "課務承辦人Email" },
  { value: "actions", title: "操作", sortable: false },
];

const departmentApiEndpoints = {
  get: "/get_depts",
  add: "/create_dept",
  update: "/update_dept/{id}",
  delete: "/delete_dept/{id}",
};

const requiredRule = (value) => !!value || "此欄位為必填。";

// -----------------
// 函式
// -----------------

// 從後端獲取課務承辦人資料
const fetchCagentData = async () => {
  try {
    const response = await $curridataAPI.get("/get_cagents");
    cagentData.value = response.data;
  } catch (error) {
    console.error("無法從 API 取得課務承辦人資料。", error);
  }
};

const handleEdit = (item) => {
  // 檢查是否有課務承辦人資料，並轉換為物件
  if (item.CAGENT) {
    const cagent = cagentData.value.find((c) => c.NAME === item.CAGENT);
    if (cagent) {
      item.CAGENT = cagent;
      item.CAGENTEXT = cagent.EXT;
      item.CAGENTEMAIL = cagent.EMAIL;
    }
  }
};

const handleFieldUpdated = ({ key, value }) => {
  // 如果是下拉選單，處理連動欄位
  if (key === "CAGENT_NAME" && value) {
    const internalEditedItem = dtCrudRef.value.editedItem;
    internalEditedItem.CAGENT_ID = value.ID; // 新增這行，將 ID 寫入
    internalEditedItem.CAGENT_NAME = value.NAME;
    internalEditedItem.CAGENT_EXT = value.EXT;
    internalEditedItem.CAGENT_EMAIL = value.EMAIL;
  }
};

// 定義表單欄位
const departmentFormFields = computed(() => {
  return [
    { key: "COLLEGE", label: "學院全名", type: "text", rules: [requiredRule] },
    {
      key: "COLLEGE_S",
      label: "學院簡稱",
      type: "text",
      rules: [requiredRule],
    },
    { key: "DEPT", label: "系所全名", type: "text", rules: [requiredRule] },
    {
      key: "DEPT_S",
      label: "系所簡稱",
      type: "text",
      rules: [requiredRule],
    },
    { key: "STYPE", label: "學制", type: "text", rules: [requiredRule] },
    { key: "AGENT_NAME", label: "承辦人", type: "text", rules: [requiredRule] },
    {
      key: "AGENT_EXT",
      label: "承辦人分機",
      type: "text",
      rules: [requiredRule],
    },
    {
      key: "AGENT_EMAIL",
      label: "承辦人Email",
      type: "text",
      rules: [requiredRule],
    },
    {
      key: "CAGENT_NAME",
      label: "課務承辦人",
      type: "select",
      rules: [requiredRule],
      items: cagentData.value,
      "item-title": "NAME",
      "return-object": true,
    },
    {
      key: "CAGENT_ID",
      label: "課務承辦人ID",
      type: "text",
      readonly: true,
      class: "d-none",
      cellClass: "d-none",
    },
    {
      key: "CAGENT_EXT",
      label: "課務承辦人分機",
      type: "text",
      readonly: true,
    },
    {
      key: "CAGENT_EMAIL",
      label: "課務承辦人Email",
      type: "text",
      readonly: true,
    },
  ];
});

// 使用 computed 屬性來過濾出可見的欄位
const visibleHeaders = computed(() => {
  const hiddenValues = ["CAGENT_ID", "AGENT_ID"];
  return allHeaders.filter((header) => !hiddenValues.includes(header.value));
});

onMounted(() => {
  fetchCagentData();
});
</script>
