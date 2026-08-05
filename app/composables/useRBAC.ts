export const useRBAC = () => {
  const roleMap: Record<string, string[]> = {
    admin: [
      "/DB/Members",
      "/DB/CurriAgent",
      "/DB/DBmaintain",
      "/DB/ClassDeptshort",
      "/Converters",
      "/Info",
      "/Tools",
      "/Info/courseQuery",
    ],

    curri: [
      "/welcome",
      "/DB/DBmaintain",
      "/DB/ClassDeptshort",
      "/Converters",
      "/Info",
      "/Info/courseQuery",
    ],

    user: [
      "/welcome",
      "/Converters/ClassToOthers",
      "/Converters/SIDtoSYS",
      "/Info",
      "/Info/courseQuery",
    ],

    guest: ["/welcome", "/Info", "/courseQuery"],
  };

  const canAccess = (role: string, path: string) => {
    if (role === "admin") return true;

    const allowList = roleMap[role] || [];

    return allowList.some((p) => path.startsWith(p));
  };

  return {
    roleMap,
    canAccess,
  };
};
