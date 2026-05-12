<template>
  <div>
    <h2>{{ title }}</h2>

    <div v-if="errorMessage" class="text-red-500">
      <p>{{ errorMessage }}</p>
    </div>

    <v-card v-else class="mt-4">
      <v-card-title>
        <div class="d-flex ga-4 justify-space-between align-center w-100">
          <span>{{ tableTitle }}</span>
          <div class="d-flex ga-4 align-center">
            <v-btn
              color="primary"
              prepend-icon="mdi-plus-circle"
              @click="openDialog('add')"
              height="40"
            >
              新增{{ itemSingular }}
            </v-btn>
            <v-text-field
              v-model="search"
              label="輸入關鍵字查詢"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              class="search-field"
            ></v-text-field>
          </div>
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        class="elevation-10"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="openDialog('edit', item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col
                  v-for="field in formFields"
                  :key="field.key"
                  cols="12"
                  sm="6"
                >
                  <!-- Dynamic form field rendering -->
                  <v-text-field
                    v-if="field.type === 'text'"
                    v-model="editedItem[field.key]"
                    :label="field.label"
                    :rules="field.rules"
                    :readonly="field.readonly"
                  ></v-text-field>

                  <v-select
                    v-else-if="field.type === 'select'"
                    v-model="editedItem[field.key]"
                    :items="field.items"
                    :item-title="field['item-title']"
                    :item-value="field['item-value']"
                    :label="field.label"
                    :rules="field.rules"
                    :return-object="field['return-object']"
                    @update:model-value="
                      handleSelectUpdate(field.key, editedItem[field.key])
                    "
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog"
            >取消</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="saveItem"
            >儲存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 自定義訊息對話框，取代 confirm() -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">確認</v-card-title>
        <v-card-text>{{ confirmMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cancelDelete"
            >取消</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="confirmDelete"
            >確定</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="deep-orange-darken-1"
    location="top center"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useNuxtApp } from "#app";

// Emit custom events
const emit = defineEmits(["field-updated", "on-edit"]);
const snackbar = ref(false);
const text = `[error 409] 系所簡稱必須為唯一值，已有相同的系所簡稱。`;
// 宣告 props
const props = defineProps({
  title: String,
  tableTitle: String,
  headers: Array,
  apiUrl: String,
  apiEndpoints: Object,
  formFields: Array,
  itemSingular: String,
});

// -----------------
// 狀態變數
// -----------------
const items = ref([]);
const search = ref("");
const errorMessage = ref(null);
const dialog = ref(false);
const editedItem = ref({});
const dialogType = ref("");
const form = ref(null);

const confirmDialog = ref(false);
const confirmMessage = ref("");
const itemToDelete = ref(null);

// Expose internal editedItem to parent component
defineExpose({ editedItem });

// -----------------
// 計算屬性
// -----------------
const formTitle = computed(() => {
  return dialogType.value === "add"
    ? `新增${props.itemSingular}`
    : `編輯${props.itemSingular}`;
});

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  const searchText = search.value.toLowerCase();
  return items.value.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    )
  );
});

// -----------------
// 函式
// -----------------
const { $curridataAPI } = useNuxtApp();

const fetchData = async () => {
  try {
    const response = await $curridataAPI.get(
      props.apiUrl + props.apiEndpoints.get
    );
    items.value = response.data;
  } catch (error) {
    console.error(error);
    errorMessage.value = "無法從 API 取得資料。";
  }
};

const openDialog = (type, item = {}) => {
  dialogType.value = type;
  editedItem.value = { ...item };
  // 在編輯模式下，發出事件給父元件進行前置處理
  if (type === "edit") {
    emit("on-edit", editedItem.value);
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = {};
  if (form.value) {
    form.value.resetValidation();
  }
};

const handleSelectUpdate = (key, value) => {
  // Emit event to parent for fields with custom logic (like linked fields)
  emit("field-updated", { key, value });
};

const saveItem = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }

  // 複製一份 editedItem，並在傳送前將物件轉換為字串
  const itemToSave = { ...editedItem.value };
  for (const field of props.formFields) {
    if (
      field.type === "select" &&
      field["return-object"] &&
      itemToSave[field.key] &&
      typeof itemToSave[field.key] === "object"
    ) {
      itemToSave[field.key] =
        itemToSave[field.key][field["item-title"] || "NAME"];
    }
  }
  //新增前看一下itemToSave
  console.log("itemToSave", itemToSave);
  try {
    if (dialogType.value === "add") {
      console.log("create by itemToSave", itemToSave);
      await $curridataAPI.post(
        props.apiUrl + props.apiEndpoints.add,
        itemToSave
      );
    } else {
      // 修改、更新
      const endpoint = props.apiEndpoints.update.replace("{id}", itemToSave.ID);
      await $curridataAPI.put(props.apiUrl + endpoint, itemToSave);
    }
    closeDialog();
    await fetchData();
  } catch (error) {
    console.error(error);
    console.log(error.message);
    console.log(error.response.data.detail);
    snackbar.value = true;
    errorMessage.value = error.response?.data?.detail || "儲存資料失敗。";
  }
};

const deleteItem = (item) => {
  itemToDelete.value = item;
  confirmMessage.value = `確定要刪除${props.itemSingular} ${
    item[props.headers[1].value]
  } 嗎？`;
  confirmDialog.value = true;
};

const confirmDelete = async () => {
  const item = itemToDelete.value;
  if (!item || !item.ID) {
    errorMessage.value = `刪除失敗：無效的${props.itemSingular} ID。`;
    console.error("嘗試刪除一個沒有 ID 的項目。");
    confirmDialog.value = false;
    return;
  }

  try {
    const endpoint = props.apiEndpoints.delete.replace("{id}", item.ID);
    await $curridataAPI.delete(props.apiUrl + endpoint);
    await fetchData();
    confirmDialog.value = false;
  } catch (error) {
    console.error(error);
    errorMessage.value = error.response?.data?.detail || "刪除資料失敗。";
    confirmDialog.value = false;
  }
};

const cancelDelete = () => {
  confirmDialog.value = false;
  itemToDelete.value = null;
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.search-field {
  min-width: 100px;
}

@media (min-width: 600px) {
  .search-field {
    min-width: 300px;
  }
}
</style>
