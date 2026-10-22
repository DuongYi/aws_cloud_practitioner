export interface FakeCodeFile {
  id: string;
  name: string;
  path: string;
  language: string;
  icon: 'ts' | 'tf' | 'yaml' | 'py' | 'rs' | 'docker' | 'json' | 'md' | 'test';
  gitStatus?: 'M' | 'U' | 'A';
  fileType?: 'code' | 'exam' | 'lecture';
  content: string;
}

export const FAKE_PROJECT_FILES: FakeCodeFile[] = [
  {
    id: 'exam-runner',
    name: 'clf-c02-practice-exam-1.spec.ts',
    path: 'tests/exams/clf-c02-practice-exam-1.spec.ts',
    language: 'typescript',
    icon: 'test',
    gitStatus: 'M',
    fileType: 'exam',
    content: `// AWS Certified Cloud Practitioner (CLF-C02) Interactive Test Suite`
  },
  {
    id: 'lecture-guide',
    name: 'AWS_CLF_C02_CURRICULUM.md',
    path: 'docs/curriculum/AWS_CLF_C02_CURRICULUM.md',
    language: 'markdown',
    icon: 'md',
    fileType: 'lecture',
    content: `# AWS Certified Cloud Practitioner (CLF-C02) Complete Curriculum`
  },
  {
    id: 'cloud-orchestrator',
    name: 'cloud-orchestrator.ts',
    path: 'src/services/cloud-orchestrator.ts',
    language: 'typescript',
    icon: 'ts',
    gitStatus: 'M',
    fileType: 'code',
    content: `import { 
  ECSClient, 
  RunTaskCommand, 
  DescribeTasksCommand 
} from "@aws-sdk/client-ecs";
import { 
  DynamoDBClient, 
  PutItemCommand, 
  UpdateItemCommand 
} from "@aws-sdk/client-dynamodb";
import { 
  CloudWatchClient, 
  PutMetricDataCommand 
} from "@aws-sdk/client-cloudwatch";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Logger } from "../utils/telemetry";

export interface ClusterProvisionConfig {
  clusterArn: string;
  taskDefinition: string;
  subnets: string[];
  securityGroups: string[];
  desiredInstances: number;
  environment: 'production' | 'staging';
}

/**
 * Enterprise Multi-Region Cloud Orchestration Engine
 * Handles zero-downtime task scheduling & auto-scaling reconciliation
 */
export class CloudInfrastructureManager {
  private ecs: ECSClient;
  private dynamo: DynamoDBClient;
  private cloudwatch: CloudWatchClient;
  private sqs: SQSClient;
  private logger: Logger;

  constructor(region: string = process.env.AWS_REGION || "us-east-1") {
    this.ecs = new ECSClient({ region, maxAttempts: 5 });
    this.dynamo = new DynamoDBClient({ region });
    this.cloudwatch = new CloudWatchClient({ region });
    this.sqs = new SQSClient({ region });
    this.logger = new Logger("CloudOrchestrator");
  }

  public async scheduleHighThroughputTask(config: ClusterProvisionConfig): Promise<{ taskId: string; status: string }> {
    this.logger.info("Initializing high-availability task execution...", {
      cluster: config.clusterArn,
      instances: config.desiredInstances,
      env: config.environment
    });

    const runCommand = new RunTaskCommand({
      cluster: config.clusterArn,
      taskDefinition: config.taskDefinition,
      count: config.desiredInstances,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: config.subnets,
          securityGroups: config.securityGroups,
          assignPublicIp: "DISABLED",
        },
      },
      tags: [
        { key: "Environment", value: config.environment },
        { key: "CostCenter", value: "CC-ENTERPRISE-PROD" },
        { key: "ManagedBy", value: "Terraform/CloudOrchestrator" }
      ]
    });

    const response = await this.ecs.send(runCommand);
    const taskArn = response.tasks?.[0]?.taskArn;

    if (!taskArn) {
      throw new Error("[CRITICAL_FAILURE] Failed to spawn Fargate instance in target VPC");
    }

    // Persist session audit state to DynamoDB Single Table
    await this.dynamo.send(new PutItemCommand({
      TableName: "EnterpriseCloudState-Prod",
      Item: {
        PK: { S: \`TASK#\${taskArn}\` },
        SK: { S: \`METADATA#\${Date.now()}\` },
        Cluster: { S: config.clusterArn },
        State: { S: "RUNNING" },
        AllocatedAt: { N: Date.now().toString() },
        HealthCheckVerified: { BOOL: true }
      }
    }));

    // Emit CloudWatch high-resolution metric data
    await this.cloudwatch.send(new PutMetricDataCommand({
      Namespace: "AWS/CustomEnterprise/Orchestrator",
      MetricData: [
        {
          MetricName: "TasksDispatched",
          Value: config.desiredInstances,
          Unit: "Count",
          Dimensions: [{ Name: "Environment", Value: config.environment }]
        }
      ]
    }));

    return {
      taskId: taskArn.split("/").pop() || "task-unknown",
      status: "DISPATCHED_HEALTHY"
    };
  }

  public async pollTaskHealthUntilStable(cluster: string, taskId: string): Promise<boolean> {
    let retries = 0;
    const maxRetries = 15;

    while (retries < maxRetries) {
      const { tasks } = await this.ecs.send(new DescribeTasksCommand({
        cluster,
        tasks: [taskId]
      }));

      const currentStatus = tasks?.[0]?.lastStatus;
      if (currentStatus === "RUNNING") {
        this.logger.info(\`Task \${taskId} reached steady RUNNING state.\`);
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      retries++;
    }

    return false;
  }
}`
  },
  {
    id: 'terraform-main',
    name: 'main.tf',
    path: 'infra/terraform/main.tf',
    language: 'hcl',
    icon: 'tf',
    gitStatus: 'M',
    content: `# Terraform Production Infrastructure Provisioning
# Target: AWS Multi-AZ High Availability Architecture
# State Storage: S3 Bucket (SSE-KMS) with DynamoDB Locking

terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }

  backend "s3" {
    bucket         = "aws-enterprise-tfstate-prod-useast1"
    key            = "core-infra/v2/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks-prod"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "AWS-Cloud-Practitioner-Enterprise"
      Environment = "Production"
      Compliance  = "SOC2-HIPAA"
      IaC         = "Terraform"
    }
  }
}

# 1. High Availability VPC with 3 Availability Zones
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.1"

  name = "enterprise-core-vpc-prod"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets= ["10.0.201.0/24", "10.0.202.0/24", "10.0.203.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = false
  one_nat_gateway_per_az = true
  enable_vpn_gateway     = false

  enable_dns_hostnames = true
  enable_dns_support   = true
}

# 2. AWS Elastic Kubernetes Service (EKS) Cluster
resource "aws_eks_cluster" "primary_cluster" {
  name     = "aws-prod-k8s-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn
  version  = "1.29"

  vpc_config {
    subnet_ids              = module.vpc.private_subnets
    endpoint_private_access = true
    endpoint_public_access  = false
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.eks_kms_key.arn
    }
    resources = ["secrets"]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller
  ]
}

# 3. Application Load Balancer with SSL Termination
resource "aws_lb" "external_alb" {
  name               = "core-services-alb-prod"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = true
  drop_invalid_header_fields = true

  tags = {
    Role = "ApplicationGateway"
  }
}`
  },
  {
    id: 'kubernetes-prod',
    name: 'cluster-prod.yaml',
    path: 'deploy/k8s/cluster-prod.yaml',
    language: 'yaml',
    icon: 'yaml',
    gitStatus: 'U',
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-api-gateway
  namespace: production
  labels:
    app.kubernetes.io/name: cloud-api-gateway
    app.kubernetes.io/part-of: aws-core-platform
    environment: production
spec:
  replicas: 8
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: cloud-api-gateway
  template:
    metadata:
      labels:
        app: cloud-api-gateway
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values: ["cloud-api-gateway"]
                topologyKey: "topology.kubernetes.io/zone"
      containers:
        - name: gateway-container
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/api-gateway:v2.4.1
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
              name: http
            - containerPort: 9090
              name: metrics
          resources:
            requests:
              cpu: "500m"
              memory: "1024Mi"
            limits:
              cpu: "2000m"
              memory: "2048Mi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /live
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: cloud-api-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cloud-api-gateway
  minReplicas: 8
  maxReplicas: 48
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 75`
  },
  {
    id: 'ai-inference',
    name: 'inference_pipeline.py',
    path: 'ml/services/inference_pipeline.py',
    language: 'python',
    icon: 'py',
    gitStatus: 'M',
    content: `"""
Enterprise Distributed Transformer Inference Worker
Supports flash-attention v2, FP16/INT4 tensor quantization & continuous batching.
"""

import asyncio
import os
import time
from typing import AsyncGenerator, Dict, List, Any
import torch
import torch.nn as nn
from dataclasses import dataclass

@dataclass
class GenerationRequest:
    prompt_tokens: List[int]
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.95
    stream_chunk_size: int = 4

class ProductionInferenceEngine:
    def __init__(self, model_checkpoint: str = "meta-llama/Llama-3-70B-Instruct"):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.precision = torch.float16
        print(f"[ENGINE_INIT] Loading weights from {model_checkpoint} onto {self.device}...")
        self._init_kv_cache_pool()

    def _init_kv_cache_pool(self, max_batch_size: int = 64, max_seq_len: int = 4096):
        """Pre-allocates GPU tensor buffers for zero-fragmentation paging memory."""
        self.cache_pool = {
            "allocated_blocks": 1024,
            "block_size": 16,
            "gpu_utilization_ratio": 0.88,
            "active_streams": 0
        }
        print(f"[CACHE_POOL] PagedAttention buffer ready: {self.cache_pool['allocated_blocks']} blocks allocated.")

    async def generate_stream(self, req: GenerationRequest) -> AsyncGenerator[Dict[str, Any], None]:
        start_time = time.perf_counter()
        token_count = 0
        
        # Simulate continuous batching step
        for token_idx in range(req.max_tokens):
            await asyncio.sleep(0.018)  # 55 tokens/second throughput emulation
            token_count += 1
            
            # Simulated sampled token logits
            simulated_token_id = 1000 + (token_idx * 17) % 32000
            
            yield {
                "token_id": simulated_token_id,
                "text": f"token_{token_idx} ",
                "logprob": -0.142,
                "latency_ms": (time.perf_counter() - start_time) * 1000
            }
            
            if token_idx > 30 and token_idx % 120 == 0:
                torch.cuda.empty_cache()

    async def health_check(self) -> Dict[str, Any]:
        return {
            "status": "HEALTHY",
            "device": str(self.device),
            "allocated_memory_gb": 42.6,
            "active_workers": 8,
            "throughput_tokens_per_sec": 384.2
        }

if __name__ == "__main__":
    engine = ProductionInferenceEngine()
    print("[RUNNER] Autonomous worker listening on socket unix:///tmp/ai_runner.sock")`
  },
  {
    id: 'crypto-verifier',
    name: 'token_verifier.rs',
    path: 'src/security/token_verifier.rs',
    language: 'rust',
    icon: 'rs',
    content: `// High-Performance Cryptographic Authentication Verifier
// Zero-allocation JWT / Ed25519 Signature Verification

use std::sync::Arc;
use tokio::sync::RwLock;
use ring::signature::{UnparsedPublicKey, ED25519};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub tenant_id: String,
    pub permissions: Vec<String>,
    pub exp: u64,
    pub iss: String,
}

pub struct SecurityVerifier {
    public_key: UnparsedPublicKey<Vec<u8>>,
    revocation_cache: Arc<RwLock<std::collections::HashSet<String>>>,
}

impl SecurityVerifier {
    pub fn new(raw_pubkey: &[u8]) -> Result<Self, &'static str> {
        let public_key = UnparsedPublicKey::new(&ED25519, raw_pubkey.to_vec());
        Ok(Self {
            public_key,
            revocation_cache: Arc::new(RwLock::new(std::collections::HashSet::new())),
        })
    }

    pub async fn verify_token_payload(&self, signature: &[u8], payload: &[u8]) -> Result<bool, &'static str> {
        match self.public_key.verify(payload, signature) {
            Ok(()) => Ok(true),
            Err(_) => Err("ERR_INVALID_CRYPTO_SIGNATURE"),
        }
    }
}`
  },
  {
    id: 'docker-compose-prod',
    name: 'docker-compose.prod.yml',
    path: 'docker-compose.prod.yml',
    language: 'yaml',
    icon: 'docker',
    content: `version: '3.8'

services:
  api-gateway:
    image: enterprise/api-gateway:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - AWS_REGION=us-east-1
      - CACHE_TTL_SECONDS=3600
    depends_on:
      redis-cluster:
        condition: service_healthy
    deploy:
      resources:
        limits:
          cpus: '4.0'
          memory: 4096M

  redis-cluster:
    image: redis:7.2-alpine
    command: redis-server --appendonly yes --requirepass "\${REDIS_PASSWORD}"
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    volumes:
      - redis-data:/data

volumes:
  redis-data:
    driver: local`
  }
];

export const INITIAL_TERMINAL_LOGS: string[] = [
  "[\x1b[34mINFO\x1b[0m] Initializing AWS Cloud Orchestrator Daemon v4.18.2...",
  "[\x1b[32mOK\x1b[0m] Authenticated as role: \x1b[33marn:aws:iam::123456789012:role/EnterpriseDevOpsAdmin\x1b[0m",
  "[\x1b[34mINFO\x1b[0m] Loaded 3 regions: us-east-1, us-west-2, eu-central-1",
  "[\x1b[32mOK\x1b[0m] Terraform remote state synchronized (digest: sha256:7f83b165...)",
  "[\x1b[32mOK\x1b[0m] EKS Cluster 'aws-prod-k8s-cluster' status: \x1b[32mACTIVE\x1b[0m (Nodes: 24/24 Healthy)",
  "[\x1b[34mINFO\x1b[0m] Docker daemon listening on /var/run/docker.sock",
  "[\x1b[35mWATCH\x1b[0m] File system watcher active on /workspace/aws-enterprise-core",
  "[\x1b[32mREADY\x1b[0m] All cloud microservices operational. Ready for input."
];
