import { StitchToolClient } from "@google/stitch-sdk";

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
  { name: "Token 速率可视化看板 (支持 BYOK 实时测速)", id: "160a481d89c04e629ffe4cc10de91e12" },
  { name: "Token 速率可视化看板 (带动态演示)", id: "99233533cee14d8180b33828aac38345" },
];

async function main() {
  const client = new StitchToolClient({ apiKey });

  for (const screen of screens) {
    console.log(`\n=== Fetching: ${screen.name} (${screen.id}) ===`);
    try {
      const result = await client.callTool("get_screen", {
        projectId,
        screenId: screen.id,
      });
      console.log("Result:", JSON.stringify(result, null, 2));
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  await client.close();
}

main();
