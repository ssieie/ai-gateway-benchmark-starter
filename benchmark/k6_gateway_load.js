import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 2000 }, // 阶梯加压至 2000 VU
    { duration: '5m', target: 2000 }, // 稳态保持
    { duration: '1m', target: 5000 }, // 冲击 5000 VU 探底
    { duration: '3m', target: 5000 },
    { duration: '1m', target: 0 },    // 降压
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 网关 P99 必须 < 500ms
    http_req_failed: ['rate<0.01'],   // 错误率 < 1%
  },
};

export default function () {
  const url = 'http://localhost:8080/v1/chat/completions';
  const payload = JSON.stringify({
    model: 'qwen-2.5-7b-instruct',
    messages: [{ role: 'user', content: 'Test payload for gateway benchmark.' }],
    max_tokens: 256,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-api-key',
    },
  };

  const res = http.post(url, payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  
  sleep(1);
}
