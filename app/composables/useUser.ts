interface User {
  id: number;
  name: string;
  auth: string;
  username: string;
}

export const useUser = () => {
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("token", () => null);

  const initUser = () => {
    if (!process.client) return;

    const savedUser = localStorage.getItem("curridata_user");
    const savedToken = localStorage.getItem("curridata_token");

    user.value = savedUser ? JSON.parse(savedUser) : null;
    token.value = savedToken || null;
  };

  const setUser = (data: User, tokenValue: string) => {
    user.value = data;
    token.value = tokenValue;

    localStorage.setItem("curridata_user", JSON.stringify(data));
    localStorage.setItem("curridata_token", tokenValue);
  };

  const clearUser = () => {
    user.value = null;
    token.value = null;

    localStorage.removeItem("curridata_user");
    localStorage.removeItem("curridata_token");
  };

  return {
    user,
    token,
    initUser,
    setUser,
    clearUser,
  };
};
