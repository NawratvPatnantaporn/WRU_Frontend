pipeline {
    agent any
    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        DOCKER_NETWORK = "app-net"
    }
    stages {
        stage('Cleanup') {
            steps {
                sh "docker rm -f mongo wru_backend-run wru_frontend-run || true"
            }
        }
        
        stage('Debug Path') {
            steps {
                sh 'echo $PATH'
                sh 'ls -l /usr/local/bin/docker'
                sh 'whoami'
            }
        }
        
        stage('Checkout') {
            steps {
                // Checkout Frontend
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    // extensions: [[$class: 'CleanCheckout']],
                    userRemoteConfigs: [[credentialsId: 'nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Frontend.git']]
                ])
                    print "Check Success"
            }
        }

        stage('Verify Files') {
            steps {
                sh 'ls -la'          // ตรวจสอบไฟล์ทั้งหมดใน Root Directory
                sh 'pwd'             // แสดง path ปัจจุบัน
                sh 'find . -name Dockerfile'  // ค้นหาไฟล์ Dockerfile ทั้ง Workspace
            }
        }

        stage('Prepare Network') {
            steps {
                sh "docker network inspect ${DOCKER_NETWORK} || docker network create ${DOCKER_NETWORK}"
            }
        }

        stage('Run MongoDB') {
            steps {
                sh "docker rm -f mongo || true"  // ✅ ลบ Container เก่า (ถ้ามี)
                sh "docker run -d --name mongo --network ${DOCKER_NETWORK} -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 mongo:latest"
            }
        }

        stage('Build & Run Backend') {
            steps {
                dir('backend') {
                    sh "docker build -t wru_backend ."
                    sh "docker run -d --name wru_backend-run --network ${DOCKER_NETWORK} -p 30100:50100 wru_backend"
                }
            }
        }

        stage('Build & Run Frontend') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'find . -name Dockerfile'

                sh 'find . -type f | grep -i docker'

               print "Docker Build Image"
               script {
                   sh "docker rm -f csi402-frontend-run || true"
                   sh "docker build -t csi402-frontend:latest ."
                   sh "docker run -d --name csi402-frontend-run -p 54100:5173 csi402-frontend:latest"
                   print "Docker Image to Running Container Succes"
               } 
            }
        }

        stage('Test') {
            steps {
                print "Clone Automation Testing Project"
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    // extensions: [[$class: 'CleanCheckout']],
                    userRemoteConfigs: [[credentialsId: 'nawarat', url: 'https://github.com/NawratvPatnantaporn/Automation.git']]
                ])

                    print "Install Robot"
                    sh 'curl -sS https://bootstrap.pypa.io/get-pip.py -o get-pip.py'
                    sh 'python3 get-pip.py'
                    sh 'pip3 install robotframework'
                    print "Install Selenium Library"
                    sh 'pip3 install robotframework-seleniumlibrary'
                    print "Verify Robot Framwork installation"
                    sh 'pip3 show robotframework'
                    print "Run Robot Framwork Test"
                    sh 'python3 -m robot wru_test.robot'
            }
        }
    }

}
