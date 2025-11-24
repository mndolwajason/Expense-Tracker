resource "aws_dynamodb_table" "expenses" {
  name         = "jm-fproj-expenses"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "UserId"
  range_key = "ExpenseId"

  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "ExpenseId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Course  = "MSIT3470"
    Project = "FinalExpenseTracker"
    Owner   = "jason.mndolwa"
    Env     = "Dev"
  }
}

