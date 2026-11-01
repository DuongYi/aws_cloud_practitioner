import json, re

with open('scratch_parsed_raw.json') as f:
    questions = json.load(f)

with open('scratch/q_images_ocr.json') as f:
    ocr_texts = json.load(f)

# Known clean question prompts for the 28 image questions
cleaned_ocr = {
    10: "Which of the following is a fully managed graph database service on AWS?",
    20: "A company is hosting an application in the AWS Cloud. The company wants to verify that the underlying AWS infrastructure is compliant with required standards. Which AWS service should the company use?",
    30: "Which characteristic of the AWS Cloud helps users eliminate underutilized CPU capacity?",
    40: "A company needs to perform data processing once a week that typically takes about 5 hours to complete. Which AWS service should the company use for this workload?",
    50: "A company is running an application on AWS. The company wants to identify and prevent the accidental deletion of Amazon S3 objects. Which AWS service or feature will meet these requirements?",
    60: "A company wants its Amazon EC2 instances to share the same geographic area but use redundant underlying power sources. Which solution will meet these requirements?",
    70: "Which perspective of the AWS Cloud Adoption Framework (AWS CAF) connects technology and business?",
    80: "A company wants to ensure that all of its Amazon EC2 instances have compliant operating system patches. Which AWS service will meet these requirements?",
    90: "A company wants to receive a notification when a specific AWS cost threshold is reached. Which AWS services or tools can the company use to meet this requirement? (Select TWO.)",
    100: "A company wants to track its AWS account's service costs. The company also wants to receive notifications when costs are forecasted to reach a specific level. Which AWS service or tool provides this functionality?",
    110: "A company has a physical tape library to store data backups. The tape library is running out of space. The company needs to extend the tape library's capacity to the AWS Cloud. Which AWS service should the company use to meet this requirement?",
    120: "A company has a workload that requires data to be collected, analyzed, and stored on premises. The company wants to extend the use of AWS services to run on premises with access to the company network and the company's VPC. Which AWS service meets this requirement?",
    130: "What is a benefit of AWS serverless computing?",
    140: "A company is running and managing its own Docker environment on Amazon EC2 instances. The company wants an alternative to help manage cluster size, scheduling, and environment maintenance. Which AWS service meets these requirements?",
    150: "Which AWS Support plan provides customers with access to an AWS technical account manager (TAM)?",
    160: "A company wants to migrate its on-premises data warehouse to AWS. The information in the data warehouse is used to populate analytics dashboards. Which AWS service should the company use for the data warehouse?",
    170: "A company needs to set up user authentication for a mobile application. Users must be able to sign in directly with a user name and password, or through a third-party identity provider. Which AWS service should the company use to meet these requirements?",
    180: "Which options are perspectives that include foundational capabilities of the AWS Cloud Adoption Framework (AWS CAF)? (Select TWO.)",
    190: "Which AWS service should be used when a company needs to provide its remote employees with virtual desktops?",
    200: "Which AWS Support plan is the minimum recommended tier for users who have production workloads on AWS?",
    210: "A company wants to run its production workloads on AWS. The company needs concierge service, a designated AWS technical account manager (TAM), and technical support that is available 24 hours a day, 7 days a week. Which AWS Support plan will meet these requirements?",
    220: "A company needs help managing multiple AWS linked accounts that are reported on a consolidated bill. Which AWS Support plan includes an AWS concierge whom the company can ask for assistance?",
    230: "A company is using AWS Lambda functions to build an application. Which tasks are the company's responsibility, according to the AWS shared responsibility model? (Select TWO.)",
    240: "Which AWS service offers consolidated billing?",
    250: "Which AWS service is designed to help users build conversational interfaces into applications using voice and text?",
    260: "A company needs a fully managed, scalable elastic NFS file system for use with AWS Cloud services and on-premises resources. Which AWS service meets these requirements?",
    270: "Which AWS service or feature is used to send both text and email messages from distributed applications?",
    280: "Which of the following is an AWS Well-Architected Framework design principle for operational excellence in the AWS Cloud?"
}

# Apply cleaned_ocr to questions
for q in questions:
    num = q['num']
    if num in cleaned_ocr:
        q['q_text'] = cleaned_ocr[num]
    # Clean Q240 option D leak
    if num == 240:
        for idx, (letter, text) in enumerate(q['options']):
            if 'A company wants to limit' in text:
                q['options'][idx] = (letter, 'AWS Trusted Advisor')

print("Applied cleaned OCR to all 28 image questions.")
