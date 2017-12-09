#!/bin/bash
set -e

echo "Check for instance information..."
INSTANCE_DIR="ec2_instance"

export AMI_IMAGE_ID="ami-1a962263"

echo No instance information present, continuing.
[ -d "${INSTANCE_DIR}" ] || mkdir ${INSTANCE_DIR}

USERNAME=$(aws iam get-user --query 'User.UserName' --output text)

SECURITY_GROUP_NAME=hgop-${USERNAME}

echo "Using security group name ${SECURITY_GROUP_NAME}"

if [ ! -e ./ec2_instance/security-group-name.txt ]; then
    echo ${SECURITY_GROUP_NAME} > ./ec2_instance/security-group-name.txt
fi

if [ ! -e ${INSTANCE_DIR}/${SECURITY_GROUP_NAME}.pem ]; then
    aws ec2 create-key-pair --key-name ${SECURITY_GROUP_NAME} --query 'KeyMaterial' --output text > ${INSTANCE_DIR}/${SECURITY_GROUP_NAME}.pem
    chmod 400 ${INSTANCE_DIR}/${SECURITY_GROUP_NAME}.pem
fi

if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name ${SECURITY_GROUP_NAME} --description "security group for dev environment in EC2" --query "GroupId"  --output=text)
    echo ${SECURITY_GROUP_ID} > ./ec2_instance/security-group-id.txt
    echo Created security group ${SECURITY_GROUP_NAME} with ID ${SECURITY_GROUP_ID}
else
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
fi

MY_PUBLIC_IP=$(curl http://checkip.amazonaws.com)
if [ ! -e ./ec2_instance/instance-id.txt ]; then
    echo Create ec2 instance on security group ${SECURITY_GROUP_ID} ${AMI_IMAGE_ID}
    INSTANCE_INIT_SCRIPT=docker-instance-init.sh
    INSTANCE_ID=$(aws ec2 run-instances  --user-data file://${INSTANCE_INIT_SCRIPT} --image-id ${AMI_IMAGE_ID} --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${SECURITY_GROUP_NAME} --query 'Instances[0].InstanceId'  --output=text)
    echo ${INSTANCE_ID} > ./ec2_instance/instance-id.txt

    echo Waiting for instance to be running
    echo aws ec2 wait --region eu-west-1 instance-running --instance-ids ${INSTANCE_ID}
    aws ec2 wait --region eu-west-1 instance-running --instance-ids ${INSTANCE_ID}
    echo EC2 instance ${INSTANCE_ID} ready.
fi

if [ ! -e ./ec2_instance/instance-public-name.txt ]; then
    export INSTANCE_PUBLIC_NAME=$(aws ec2 describe-instances --instance-ids ${INSTANCE_ID} --query "Reservations[*].Instances[*].PublicDnsName" --output=text)
    echo ${INSTANCE_PUBLIC_NAME} > ./ec2_instance/instance-public-name.txt
fi

MY_CIDR=${MY_PUBLIC_IP}/32

echo Using CIDR ${MY_CIDR} for access restrictions.
ALLIP="0.0.0.0/0";

set +e
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${MY_CIDR}
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 80 --cidr ${ALLIP}
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 8080 --cidr ${ALLIP}
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 8081 --cidr ${ALLIP}


set +e
scp -o StrictHostKeyChecking=no -i "./$INSTANCE_DIR/${SECURITY_GROUP_NAME}.pem" ec2-user@$INSTANCE_PUBLIC_NAME:/var/log/cloud-init-output.log ./$INSTANCE_DIR/cloud-init-output.log
scp -o StrictHostKeyChecking=no -i "./$INSTANCE_DIR/${SECURITY_GROUP_NAME}.pem" ec2-user@$INSTANCE_PUBLIC_NAME:/var/log/user-data.log ./$INSTANCE_DIR/user-data.log


echo  Server is available on ${INSTANCE_PUBLIC_NAME}
