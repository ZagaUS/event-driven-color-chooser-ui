terraform {
  backend "s3" {
    bucket = "iamclyde-terraform"
    key    = "colorchooser/terraform.tfstate"
    region = "us-east-1"
  }
}

locals {
  zone_name = "iamcly.de"
  app_name  = "colorchooser"
}

data "aws_route53_zone" "primary" {
  name = "${local.zone_name}."
}

module "website_with_cname" {
  source         = "git::https://github.com/cloudposse/terraform-aws-s3-website.git?ref=master"
  namespace      = "demo"
  stage          = "develop"
  name           = local.app_name
  hostname       = "${local.app_name}.${local.zone_name}"
  parent_zone_id = data.aws_route53_zone.primary.zone_id
  index_document = "index.html"
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ${path.module}/../www s3://${module.website_with_cname.s3_bucket_name} --exact-timestamps"
  }
}
