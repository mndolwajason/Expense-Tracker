# Final Report (Draft)

## What & Why
I built a tiny expense tracker because I struggle to manage day-to-day spending.
The app records expenses (write) and lists them (read) using DynamoDB.

## High-Level Design
- Compute: EC2 (Amazon Linux 2023 + Node.js/Express)
- Data: DynamoDB (PAY_PER_REQUEST, PITR ON, SSE enabled)
- IAM: EC2 role with access only to the expenses table
- Networking: VPC, public subnets, Internet Gateway, Security Group (HTTP from world, SSH from my /32)
- Monitoring: CloudWatch dashboard + CPU alarm

## Evidence
See project/screenshots for VPC, EC2, IAM, DynamoDB, CloudWatch, and curl proofs.

## Cost/Safety
Using t3.micro and DynamoDB on-demand. PitR is enabled for the table.
I will clean up resources after grading. SSH is restricted to my IP.

## AI Use Note
Used ChatGPT to scaffold Terraform, Node app, and documentation.
I reviewed IAM, networking, and tested CRUD operations manually.

