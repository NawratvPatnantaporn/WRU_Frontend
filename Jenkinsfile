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
                    extensions: [[$class: 'CleanCheckout']],
                    userRemoteConfigs: [[credentialsId: 'nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Project.git']]
                ])

                // Checkout Backend
                dir('backend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[credentialsId: 'nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Backend.git']]
                    ])
                }
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

                dir('frontend') {
                    sh 'pwd'
                    sh 'ls -la'
                    sh "docker build --build-arg VITE_API_AUTH_URL=http://backend:50100/api/auth -t wru_frontend ."
                    sh "docker run -d --name wru_frontend-run --network ${DOCKER_NETWORK} -p 30101:5173 wru_frontend"
                }
            }
        }

        stage('Test') {
            steps {
                sh 'curl -Is http://localhost:30100/api/auth/check-auth | head -n 1'
                sh 'docker logs wru_backend-run --tail 50'
            }
        }
    }

    post {
        always {
            sh 'docker ps -a --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"'
            sh 'docker network inspect ${DOCKER_NETWORK}'
        }
    }
}
