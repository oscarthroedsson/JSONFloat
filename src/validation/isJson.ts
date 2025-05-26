export const isValidJson = (data: string) => {
  try {
    console.log("data: ", data);
    JSON.parse(data);
    return true;
  } catch (err) {
    console.error("❌ JSON.parse error:", err);
    console.error("⛔️ Offending input:", data);
    return false;
  }
};
