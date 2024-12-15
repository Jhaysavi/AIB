export const syncWithServer = async (license) => {
  if (!navigator.onLine) return;

  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(license),
    });

    return response.ok ? "Synced successfully!" : "Failed to sync.";
  } catch (error) {
    console.error("Error syncing with server:", error);
    throw error;
  }
};
