# Expense Tracker (Solo) – MSIT 3470 Final

## Purpose
I built this project to help myself track my personal expenses while
demonstrating practical cloud skills. This is a hybrid build:
some resources via AWS Console, DynamoDB via Terraform.

## Architecture (high-level)
- EC2 running Node.js REST API
- DynamoDB table (Terraform)
- VPC + IGW + public subnet
- EC2 IAM role with least-privilege access
- CloudWatch dashboard + CPU alarm

## API Usage
curl http://<EC2_PUBLIC_IP>/health
curl -X POST http://<EC2_PUBLIC_IP>/expense -H "Content-Type: application/json" \
  -d '{"user":"jason","amount":12.5,"category":"food"}'
curl http://<EC2_PUBLIC_IP>/expense/jason

## AI Use Note
Used ChatGPT to scaffold Terraform, Node app, and documentation.
Reviewed and tested IAM and networking manually.

