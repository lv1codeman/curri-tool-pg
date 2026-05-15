<template>
  <v-container fluid>
    <v-row>
      <!-- ✅ 左 -->
      <v-col cols="12" md="6">
        <div class="left-panel">
          <!-- ✅ 上半區 -->
          <v-card class="pa-4">
            <!-- ✅ 輸出格式 -->
            <div class="d-flex align-baseline block-gap">
              <h2>輸出格式</h2>

              <v-btn-toggle v-model="mode" mandatory class="format-toggle ml-5">
                <v-btn value="email">Email</v-btn>
                <v-btn value="ext">分機</v-btn>
              </v-btn-toggle>
            </div>

            <!-- ✅ 輸出條件 -->
            <div class="d-flex align-baseline block-gap">
              <h2 style="min-width: 90px">輸出條件</h2>

              <div class="d-flex ml-5 flex-grow-1" style="gap: 20px">
                <v-select
                  label="學制"
                  :items="stypeList"
                  v-model="selectedStype"
                  density="compact"
                  style="flex: 1"
                />
                <v-text-field
                  v-model="keyword"
                  label="搜尋"
                  density="compact"
                  clearable
                  style="flex: 2"
                />
              </div>
            </div>

            <!-- ✅ 學院 -->
            <div class="d-flex justify-space-between block-gap">
              <h2>學院</h2>
              <span
                >{{ selectedColleges.length }} /
                {{ collegeList.length }}筆</span
              >
            </div>

            <!-- ✅ 學院操作 -->
            <div class="mb-3">
              <v-btn class="btn-op" @click="selectAllColleges">全選</v-btn>
              <v-btn class="btn-op mx-1" @click="clearColleges">取消</v-btn>
              <v-btn class="btn-op" @click="invertColleges">反選</v-btn>
            </div>

            <!-- ✅ ✅ ✅ 學院直接全部顯示（不scroll） -->
            <v-row class="ma-0">
              <v-col
                v-for="c in collegeList"
                :key="c"
                cols="6"
                md="4"
                class="pa-0"
              >
                <v-checkbox
                  v-model="selectedColleges"
                  :label="c"
                  :value="c"
                  density="compact"
                  hide-details
                  class="my-0"
                />
              </v-col>
            </v-row>
          </v-card>

          <!-- ✅ 下半區（往下壓 + scroll） -->
          <v-card class="pa-3 d-flex flex-column mt-4 dept-card">
            <div class="d-flex justify-space-between mb-1">
              <h2>系所清單</h2>
              <span>{{ filteredDepts.length }}筆</span>
            </div>

            <div class="mb-2">
              <v-btn class="btn-op" @click="selectAll">全選</v-btn>
              <v-btn class="btn-op mx-1" @click="clearAll">取消</v-btn>
              <v-btn class="btn-op" @click="invert">反選</v-btn>
            </div>

            <!-- ✅ scroll區 -->
            <div class="scroll flex-grow-1">
              <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="group in groupedDepts"
                  :key="group.college"
                >
                  <v-expansion-panel-title>
                    <div class="d-flex justify-space-between w-100">
                      <div>{{ group.college }}</div>
                      <div>{{ group.count }}筆</div>
                    </div>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <div class="mb-2">
                      <v-btn class="btn-op" @click="selectGroup(group)"
                        >全選</v-btn
                      >
                      <v-btn class="btn-op mx-1" @click="clearGroup(group)"
                        >取消</v-btn
                      >
                    </div>

                    <v-row dense class="ma-0">
                      <v-col
                        v-for="d in group.items"
                        :key="d.id"
                        cols="6"
                        md="4"
                        class="pa-0"
                      >
                        <v-checkbox
                          v-model="selectedDeptIds"
                          :value="d.id"
                          :label="d.dept_s + ' - ' + (d.agent_name || '')"
                          density="compact"
                          hide-details
                          class="my-0"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card>
        </div>
      </v-col>

      <!-- ✅ 右 -->
      <v-col cols="12" md="6">
        <v-card class="pa-3 right-panel">
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="d-flex align-center">
              <h2>輸出結果</h2>

              <v-btn
                class="ml-5"
                color="#688cb3"
                @click="copyResult"
                append-icon="mdi-email-multiple-outline"
              >
                複製
              </v-btn>
            </div>

            <span>{{ outputCount }}筆</span>
          </div>

          <v-textarea
            v-model="outputText"
            class="output-area"
            style="white-space: pre-wrap"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar">已複製 ✅</v-snackbar>
  </v-container>
</template>

<script setup>
definePageMeta({ layout: "layout1" });

import { ref, computed, onMounted, watch } from "vue";
import { useNuxtApp } from "#app";

const { $curridataAPI } = useNuxtApp();

const allDepts = ref([]);
const selectedStype = ref("全部");
const selectedColleges = ref([]);
const selectedDeptIds = ref([]);
const keyword = ref("");
const mode = ref("email");
const snackbar = ref(false);

onMounted(async () => {
  const res = await $curridataAPI.get("/get_depts");
  allDepts.value = res.data || [];
});

const stypeList = computed(() => {
  const base = [
    ...new Set(
      allDepts.value.map((d) => d.stype).filter((s) => s && s !== "未知")
    ),
  ];

  return ["全部", ...base, "學士班+研究所", "學院+學士班+研究所"];
});

const baseDepts = computed(() => {
  return allDepts.value
    .filter((d) => d.college && d.college !== "未知")
    .filter((d) => d.dept_s && d.dept_s !== "未知")
    .filter((d) => {
      if (selectedStype.value === "全部") return true;

      if (selectedStype.value === "學士班+研究所") {
        return ["學士班", "研究所"].includes(d.stype);
      }

      if (selectedStype.value === "學院+學士班+研究所") {
        return ["學院", "學士班", "研究所"].includes(d.stype);
      }

      return d.stype === selectedStype.value;
    });
});

const collegeList = computed(() => [
  ...new Set(baseDepts.value.map((d) => d.college)),
]);

watch(
  collegeList,
  () => {
    selectedColleges.value = [...collegeList.value];
  },
  { immediate: true }
);

const filteredDepts = computed(() =>
  baseDepts.value
    .filter((d) => selectedColleges.value.includes(d.college))
    .filter((d) =>
      keyword.value
        ? d.dept?.includes(keyword.value) || d.dept_s?.includes(keyword.value)
        : true
    )
);

watch(filteredDepts, (list) => {
  selectedDeptIds.value = list.map((d) => d.id);
});

const groupedDepts = computed(() => {
  const map = {};
  filteredDepts.value.forEach((d) => {
    if (!map[d.college]) map[d.college] = [];
    map[d.college].push(d);
  });
  return Object.keys(map).map((k) => ({
    college: k,
    items: map[k],
    count: map[k].length,
  }));
});

const outputList = computed(() => {
  const list = filteredDepts.value
    .filter((d) => selectedDeptIds.value.includes(d.id))
    .map((d) =>
      mode.value === "email" ? d.agent_email?.toLowerCase() : d.agent_ext
    )
    .filter(Boolean);

  return [...new Set(list)];
});

const outputText = computed(() => outputList.value.join("\n"));
const outputCount = computed(() => outputList.value.length);

const selectAll = () =>
  (selectedDeptIds.value = filteredDepts.value.map((d) => d.id));
const clearAll = () => (selectedDeptIds.value = []);
const invert = () => {
  selectedDeptIds.value = filteredDepts.value
    .map((d) => d.id)
    .filter((id) => !selectedDeptIds.value.includes(id));
};

const selectAllColleges = () =>
  (selectedColleges.value = [...collegeList.value]);
const clearColleges = () => (selectedColleges.value = []);
const invertColleges = () => {
  selectedColleges.value = collegeList.value.filter(
    (c) => !selectedColleges.value.includes(c)
  );
};

const selectGroup = (g) => {
  const ids = g.items.map((d) => d.id);
  selectedDeptIds.value = [...new Set([...selectedDeptIds.value, ...ids])];
};

const clearGroup = (g) => {
  const ids = g.items.map((d) => d.id);
  selectedDeptIds.value = selectedDeptIds.value.filter(
    (id) => !ids.includes(id)
  );
};

const copyResult = async () => {
  await navigator.clipboard.writeText(outputText.value);
  snackbar.value = true;
};
</script>

<style scoped>
.left-panel {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

/* ✅ 區塊間距統一 */
.block-gap {
  margin-bottom: 16px;
}

/* ✅ 系所區 */
.scroll {
  /* flex: 1; */
  max-height: 300px;
  overflow-y: auto;
}

/* ✅ 右側 */
.right-panel {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.output-area {
  flex: 1;
  overflow-y: auto;
}

/* ✅ UI */
.btn-op {
  background-color: #688cb3;
  color: white;
}

.format-toggle {
  border: 1px solid #cccccc;
}
</style>
