<template>
  <div class="card-grid-container">
    <div class="card-grid">
      <v-card
        class="card-item cursor-pointer"
        title="行事曆"
        subtitle="各學年度行事曆"
        :href="'https://acadaff.ncue.edu.tw/p/412-1002-2143.php?Lang=zh-tw'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="跨校修課優惠一覽表"
        subtitle="「臺灣國立大學系統」及「彰雲嘉大學校院聯盟」跨校修課優惠一覽表"
        :href="'https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/691174704.pdf'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer card-group-color"
        title="開設科目更正表(前台)"
        subtitle="課務組前台(需登入gm信箱)"
        :href="'https://acadaff.ncue.edu.tw/var/file/2/1002/img/1013/coursereview.html'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer card-group-color"
        title="開設科目更正表(後台)"
        subtitle="課務組後台(需登入gm信箱)"
        :href="'https://docs.google.com/spreadsheets/d/19CMRhHc12KVf6ntq75oao-jOjIk4GgGvEgWqBp2C7L0/edit?gid=1708200949#gid=1708200949'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>

      <v-card
        class="card-item cursor-pointer"
        title="課務組NAS"
        subtitle="課務組雲端"
        :href="'http://10.22.2.164:8080/cgi-bin/'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="NCUE通訊錄"
        subtitle="需登入單一簽入"
        :href="'https://portal.ncue.edu.tw/portal/contacts/'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer card-group-color"
        title="教務處網站(前台)"
        subtitle="RPAGE"
        :href="'https://acadaff.ncue.edu.tw'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer card-group-color"
        title="教務處網站(後台)"
        subtitle="需登入"
        :href="'https://acadaff.ncue.edu.tw/platform/'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="學生入口"
        subtitle="每學期選課時程"
        :href="'https://webap2.ncue.edu.tw/curri/stuEntry.html'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="學程平台"
        subtitle="仍未完善"
        :href="'https://webap1.ncue.edu.tw/PRO/'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>

      <v-card
        class="card-item cursor-pointer card-group-color"
        title="模擬學生"
        subtitle="需設定IP"
        :href="'https://webapss.ncue.edu.tw/Student/baseuser/login_ori'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer card-group-color"
        title="模擬老師"
        subtitle="需設定IP"
        :href="'https://webapss.ncue.edu.tw/Teacher/baseuser/login_ori'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="台灣銀行學雜費入口網"
        subtitle="查詢學生繳費"
        :href="'https://school.bot.com.tw/newTwbank/StudentLogin.aspx?id=Student'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
      <v-card
        class="card-item cursor-pointer"
        title="校園資訊服務入口"
        subtitle="單一簽入"
        :href="'https://portal.ncue.edu.tw/portal/home.php'"
        target="_blank"
      >
        <template v-slot:append>
          <v-icon icon="mdi-link" size="small" color="grey"></v-icon
        ></template>
      </v-card>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "layout1",
});
</script>

<!-- https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/691174704.pdf -->
<style scoped>
/* 1. 外層容器：設置最大寬度並置中 */
.card-grid-container {
  /* 將 max-width 更新為 1516px (1500 + 16) */
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 2. 內層 Flexbox 容器：控制間距和換行 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 3. 確保卡片寬度為 500px，垂直間距保持不變 */
.card-item {
  width: 300px;
  flex-shrink: 1;
  margin-bottom: 20px; /* 垂直間距也建議同步改為 8px，以保持視覺一致 */
  background-color: rgba(255, 240, 194, 50%);
}

.cursor-pointer {
  cursor: pointer;
}
.card-group-color {
  background-color: rgba(194, 225, 255, 50%);
}
</style>
