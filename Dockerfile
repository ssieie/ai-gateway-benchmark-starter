# 基础镜像
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件并安装
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目代码
COPY . .

# 暴露网关端口
EXPOSE 8000

# 启动网关服务（此处先留空，待 Devin 接入后补齐主逻辑）
CMD ["python", "-m", "http.server", "8000"]
