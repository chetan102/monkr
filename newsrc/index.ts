// === FILE: src/index.ts ===
import { startChatUI } from "./ui/chat";
import { showDashboard } from "./ui/dashboard";

function resetStdin() {
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
    }
    process.stdin.pause();
    process.stdin.removeAllListeners();
}


(async () => {
    const selectedGroup = await showDashboard();
    console.log("selected Group", selectedGroup)
    resetStdin()
    if (selectedGroup) {
        await startChatUI("test")
    }
    // await startChatUI("Test")
})();