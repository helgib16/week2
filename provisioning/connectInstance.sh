#!/usr/bin/env bash

INSTANCE_DIR="ec2_instance"
SECURITY_GROUP_NAME=$(cat ./ec2_instance/security-group-name.txt)
INSTANCE_PUBLIC_NAME=$(cat ./ec2_instance/instance-public-name.txt)

ssh -i "./$INSTANCE_DIR/$SECURITY_GROUP_NAME.pem" ec2-user@${INSTANCE_PUBLIC_NAME}
