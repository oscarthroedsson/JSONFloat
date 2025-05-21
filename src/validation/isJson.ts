export const isValidJson = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};
