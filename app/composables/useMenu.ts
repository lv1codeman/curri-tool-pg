export interface MenuItem {
  title: string;
  icon?: string;
  path?: string;
  group?: boolean;
  roles: string[];
  children?: MenuItem[];
}

export const useMenu = () => {
  const menu: MenuItem[] = [
    {
      title: "首頁",
      icon: "mdi-home",
      path: "/welcome",
      roles: ["admin", "curri", "user", "guest"],
    },

    {
      title: "資訊速查",
      icon: "mdi-information-outline",
      path: "/Info/Info",
      roles: ["admin", "curri", "user", "guest"],
    },

    {
      title: "資料庫維護",
      icon: "mdi-database",
      group: true,
      roles: ["admin", "curri"],
      children: [
        {
          title: "帳號維護",
          icon: "mdi-account",
          path: "/DB/Members",
          roles: ["admin"],
        },

        {
          title: "課務承辦",
          icon: "mdi-account-tie",
          path: "/DB/CurriAgent",
          roles: ["admin"],
        },

        {
          title: "系所表維護",
          icon: "mdi-table",
          path: "/DB/DBmaintain",
          roles: ["admin", "curri"],
        },

        {
          title: "班級對應",
          icon: "mdi-compare-horizontal",
          path: "/DB/ClassDeptshort",
          roles: ["admin", "curri"],
        },
      ],
    },

    {
      title: "課務工具",
      icon: "mdi-refresh",
      group: true,
      roles: ["admin", "curri", "user"],
      children: [
        {
          title: "班級轉換",
          icon: "mdi-file-swap",
          path: "/Converters/ClassToOthers",
          roles: ["admin", "curri", "user"],
        },

        {
          title: "學制轉換",
          icon: "mdi-school",
          path: "/Converters/SIDtoSYS",
          roles: ["admin", "curri", "user"],
        },

        {
          title: "生日轉民國年",
          icon: "mdi-file-swap",
          path: "/Converters/Bdate",
          roles: ["admin", "curri"],
        },

        {
          title: "Email複製",
          icon: "mdi-email-multiple-outline",
          path: "/Converters/CopyDeptsDetails",
          roles: ["admin", "curri"],
        },
      ],
    },
    // {
    //   title: "蛇窩",
    //   icon: "mdi-tools",
    //   group: true,
    //   roles: ["admin"],
    //   children: [
    //     {
    //       title: "異環每日",
    //       path: "/Sixer/NTEdaily",
    //       roles: ["admin", "guest"],
    //     },
    //   ],
    // },
    // {
    //   title: "工具",
    //   icon: "mdi-tools",
    //   group: true,
    //   roles: ["admin"],
    //   children: [
    //     {
    //       title: "梗圖搜尋",
    //       path: "/Tools/Meme",
    //       roles: ["admin", "curri", "user", "guest"],
    //     },

    //     {
    //       title: "YT下載",
    //       path: "/Tools/YTconverter",
    //       roles: ["admin", "curri", "user", "guest"],
    //     },
    //   ],
    // },
  ];

  return { menu };
};
