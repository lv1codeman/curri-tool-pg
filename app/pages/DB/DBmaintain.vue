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
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "layout1",
});

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
  { value: "actions", title: "操作", sortable: false },
];

const visibleHeaders = computed(() => allHeaders);

const departmentApiEndpoints = {
  get: "/get_depts",
  add: "/create_dept",
  update: "/update_dept/{id}",
  delete: "/delete_dept/{id}",
};

const requiredRule = (v) => !!v || "此欄位為必填";

const fetchCagentData = async () => {
  try {
    const res = await $curridataAPI.get("/get_cagents");
    cagentData.value = res.data;
  } catch (e) {
    console.error("抓不到 cagent", e);
  }
};

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
    rules: [requiredRule],
  },
  {
    key: "agent_email",
    label: "承辦人Email",
    type: "text",
    rules: [requiredRule],
  },

  {
    key: "cagent_name",
    label: "課務承辦人",
    type: "select",
    rules: [requiredRule],
    items: cagentData.value,
    "item-title": "name",
    "return-object": true,
  },

  { key: "cagent_id", type: "text", readonly: true },
  { key: "cagent_ext", type: "text", readonly: true },
  { key: "cagent_email", type: "text", readonly: true },
]);

onMounted(() => {
  fetchCagentData();
});
</script>
