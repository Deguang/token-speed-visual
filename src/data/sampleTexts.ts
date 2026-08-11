import type { SampleText } from '../types';

export const SAMPLE_TEXTS: SampleText[] = [
  {
    id: 'chinese-tech',
    title: '🇨🇳 中文技术解析: Transformer 与 Token 机制',
    category: 'chinese_tech',
    description: '标准中文技术文章，包含专有名词、标点与数字组合。',
    content: `大语言模型 (LLM) 的文本生成过程是以 Token 为基础单位进行的。所谓 Token，是模型理解与生成文本的子词片段（Subword Unit）。

在中文语境下，一个常见的汉字通常对应 1 至 2 个 Token。例如，“人工智能”在 Tiktoken tokenizer (如 cl100k_base) 中可能会被切分为 4 到 6 个 Token。当模型以 10 token/s 的速率输出时，意味着每秒大约生成 5 到 7 个汉字。这种速度恰好契合人类进行深度阅读与实时思考的节奏，既不会因太慢而产生等待焦虑，也不会因过快而导致视线跟不上。

控制 Token 吐出速率（Streaming Throttle）对于优化用户交互体验 (UI/UX) 至关重要。例如在长文思考链 (Reasoning Chain) 展示中，适当的吐字节奏能让用户清晰感知 AI 的逻辑思考演进过程。`,
  },
  {
    id: 'deepseek-reasoning',
    title: '🧠 深度思考链: 数学逻辑推导 (Reasoning Trace)',
    category: 'chinese_story',
    description: '模拟 DeepSeek-R1 思考过程文本，适合观察 10-15 t/s 的思考节奏。',
    content: `<think>
用户询问：证明为什么任意大于 2 的偶数都可以表示为两个质数之和（哥德巴赫猜想现状）。
我需要明确：
1. 哥德巴赫猜想目前尚未得到彻底完全的完全证明。
2. 但是在弱哥德巴赫猜想（奇数哥德巴赫猜想）上，哈拉尔德·赫尔夫戈特（Harald Helfgott）在 2013 年已经完成了完整证明。
3. 对于强哥德巴赫猜想，陈景润证明了“1+2”（陈氏定理），即任何充分大的偶数都可以表示为一个质数与一个不超过两个质数乘积之和。
4. 我需要清晰阐述证明思路、历史突破与当前数学界的前沿进展，语言表达要精准且富有条理。
</think>

关于哥德巴赫猜想（Goldbach's Conjecture）的当前研究进展：

哥德巴赫猜想是数论中最著名的未解难题之一。1742年，克里斯蒂安·哥德巴赫在给欧拉的信中提出了该猜想。

主要历史突破：
1. 陈氏定理 (1966年)：中国数学家陈景润证明了“1+2”，这是目前强哥德巴赫猜想的最佳结果。
2. 弱哥德巴赫猜想的证明 (2013年)：数学家 Harald Helfgott 彻底证明了任意大于 5 的奇数都可以表示为三个质数之和。`,
  },
  {
    id: 'code-snippet',
    title: '💻 代码生成: React Custom Hook (TypeScript)',
    category: 'code',
    description: '带缩进与代码语法的 TypeScript 代码片段。',
    content: `import { useState, useEffect, useRef } from 'react';

/**
 * 自定义 Token 流式输出速率 Hook
 * @param text 完整待吐出文本
 * @param tokensPerSecond 每秒吐出的 Token 数量 (例如 10 token/s)
 */
export function useTokenStream(text: string, tokensPerSecond: number) {
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) return;
    setStreamedText('');
    setIsStreaming(true);
    indexRef.current = 0;

    // 计算每个 Token 喷出的间隔毫秒数 (1000ms / tokensPerSecond)
    const intervalMs = 1000 / Math.max(1, tokensPerSecond);

    const timer = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setStreamedText(text);
        setIsStreaming(false);
        clearInterval(timer);
      } else {
        setStreamedText(text.slice(0, indexRef.current));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [text, tokensPerSecond]);

  return { streamedText, isStreaming };
}`,
  },
  {
    id: 'english-essay',
    title: '🇬🇧 English Article: The Speed of Thought & AI Latency',
    category: 'english_essay',
    description: '英文文章。英文中 1 个单词约对应 1.3 个 Token。',
    content: `Understanding token generation speed is fundamental to modern Artificial Intelligence user interfaces. When an LLM outputs text at 10 tokens per second, it generates roughly 7.5 English words every second, which translates to around 450 words per minute (WPM).

For comparison, the average human reading speed for comprehension ranges between 200 and 250 words per minute (approx. 5 to 6 tokens per second). Therefore, a generation rate of 10 tokens/s matches comfortable fast-reading speed, allowing readers to consume information continuously without lagging behind or feeling overwhelmed.

High-throughput systems (such as Groq LPUs or Cerebras CS-3) push generation limits to 300+ tokens/s. At these ultra-high speeds, the user interface shifts from a streaming "typewriter" perception into near-instantaneous batch response rendering.`,
  },
  {
    id: 'markdown-table',
    title: '📊 Structured Markdown: 常见模型速率对比表',
    category: 'markdown_table',
    description: '包含 Markdown 标题、表格和列表的结构化数据。',
    content: `# 大模型生成速率 (Token Speed) 纵览表

| 模型级别 | 典型代表 | 平均速率 (Token/s) | 体验感受 |
| :--- | :--- | :--- | :--- |
| 人类打字 | 键盘敲击 | 2 - 3 token/s | 缓慢逐字，适合草稿 |
| **基准对比** | **GPT-4 早期** | **10 token/s** | **朗读体感，逐句轻松跟读** |
| 思考推理 | DeepSeek-R1 | 15 - 25 token/s | 沉稳思考，逻辑性强 |
| 云端标准 | DeepSeek-V3 | 30 - 45 token/s | 略高于阅读速度 |
| 旗舰极速 | Claude 3.5 | 60 - 90 token/s | 刷屏涌出，适合长文本 |
| 芯片加速 | Groq LPU | 250 - 350 token/s | 秒杀全页，瞬时完成 |

> 💡 **核心提示**: 10 token/s 是衡量“人机实时互动”的关键心理临界点！`,
  },
];
