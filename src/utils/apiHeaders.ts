const {
  isGrafana,
  api: { token },
} = customProperties;

const authorizationHeader = {
  [`${isGrafana ? "X-DS" : ""}Authorization`]: `Bearer ${token}`,
};

export const headers = {
  "Content-Type": "application/json",
  ...authorizationHeader,
  Prefer: "return=representation",
};
