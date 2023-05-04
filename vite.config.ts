import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {crx, ManifestV3Export} from '@crxjs/vite-plugin'


// https://vitejs.dev/config/

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "ChatGPTCopyToMarkdown",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      js: ["src/content.ts"],
      matches: ["https://www.facebook.com/*","https://stackoverflow.com/questions/*/*", "https://chat.openai.com/*", "*://*/*"],
      // "*://*/*" を入れると有効になる
      // "https://chat.openai.com/*model=gpt-4*"
    }
  ],
  background: {
    service_worker: "src/background-script/background.ts",
    type: "module"
  }
};
export default defineConfig({
  plugins: [react(), crx({ manifest }),],
})
