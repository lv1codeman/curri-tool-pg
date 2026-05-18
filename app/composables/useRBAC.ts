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
    ],

    curri: [
      "/welcome",
      "/DB/DBmaintain",
      "/DB/ClassDeptshort",
      "/Converters",
      "/Info",
    ],

    user: [
      "/welcome",
      "/Converters/ClassToOthers",
      "/Converters/SIDtoSYS",
      "/Info",
    ],

    guest: ["/welcome", "/Info"],
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
