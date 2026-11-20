# AI Gateway Benchmark Starter (Qwen2.5 + vLLM + k6)

本项目用于验证 AI 网关（基于多租户隔离、限流）在接入真实开源大模型后的全链路性能。
作为申请 Devin AI 额度的落地证明，本项目将完全开源，并配置 CI/CD 自动化压测。

## 🛠 技术栈与选型
- **模型**: `Qwen/Qwen2.5-7B-Instruct-AWQ` (W4A16 量化)
- **推理引擎**: `vLLM` (高吞吐，单卡 24GB 部署)
- **网关压测**: `k6` (阶梯加压，绑定 CI 阻断阈值)

## 📊 硬性验收指标 (SLO)
- 网关单组件 P99 延迟 ≤ 500ms (不含模型推理时间)
- 全链路 P99 延迟 ≤ 3s (输入512/输出256/并发32)
- 平台侧额外开销 < 200ms

## 🚀 部署与压测流程
1. 运行 `docker-compose up -d` 启动 vLLM 及网关。
2. 运行 `k6 run benchmark/k6_gateway_load.js` 执行全链路压测。
3. 查看 `.github/workflows/k6-benchmark.yml` 中的 CI 门禁。

> **状态**: 骨架已就绪，等待算力接入后填充完整 Mock 服务及全链路灰度逻辑。
