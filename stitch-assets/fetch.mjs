import { StitchToolClient } from "@google/stitch-sdk";
import fs from 'fs/promises';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execPromise = util.promisify(exec);

const apiKey = process.env.STITCH_API_KEY;
if (!apiKey) {
  console.error("ERROR: STITCH_API_KEY environment variable is not set.");
  console.error("Please set it: export STITCH_API_KEY=your-key-here");
  process.exit(1);
}

const projectId = "16564569123618267103";
const screens = [
  { name: "Design System", id: "asset-stub-assets_a784c869f52a402289bd4f0cc97310ca" },
  { name: "Token 速率可视化看板", id: "0c41d72823414dd0b81ae0ca32a65617" },
  { name: "Three.js", id: "6864f1d2c11d4b36b612daa90d783937" },
  { name: "Token 速率可视化看板 (带动态演示)", id: "99233533cee14d8180b33828aac38345" },
  { name: "Token 速率可视化看板 (支持 BYOK 实时测速)", id: "160a481d89c04e629ffe4cc10de91e12" },
  { name: "模型基准测试详情 (Benchmarks)", id: "d7e61abee77b46ae9d2b12276ca80ad1" },
  { name: "性能趋势研究报告 (Research)", id: "655b9e5e89a04521acc9c6bf547f26ba" },
  { name: "主流模型参数库 (Models)", id: "5198210c30fe4a4a8e2a1d208bcf393d" },
  { name: "模型性能排行榜 (Leaderboard)", id: "806d7dd15f8740489fb03fe9ee9c390c" },
];

async function main() {
  const client = new StitchToolClient({ apiKey });
  const assetDir = path.join(process.cwd(), 'stitch-assets');

  for (const screen of screens) {
    console.log(`\n=== Fetching: ${screen.name} (${screen.id}) ===`);
    try {
      const result = await client.callTool("get_screen", {
        projectId,
        screenId: screen.id,
      });
      
      const htmlUrl = result?.htmlCode?.downloadUrl;
      if (htmlUrl) {
        console.log(`Downloading HTML for ${screen.id}...`);
        await execPromise(`curl -sL "${htmlUrl}" -o ${path.join(assetDir, screen.id + '.html')}`);
      }
      
      const screenshotUrl = result?.screenshot?.downloadUrl;
      if (screenshotUrl) {
        console.log(`Downloading Screenshot for ${screen.id}...`);
        await execPromise(`curl -sL "${screenshotUrl}" -o ${path.join(assetDir, screen.id + '.png')}`);
      }
      
      console.log(`Successfully processed ${screen.name}`);
    } catch (e) {
      console.error(`Error processing ${screen.name}: ${e.message}`);
    }
  }

  await client.close();
}

main();
