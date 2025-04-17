pipeline {
    agent any
    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        DOCKER_NETWORK = "app-net" // กำหนดชื่อ Network
    }
    stages {
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

        stage('Prepare Network') {
            steps {
                // สร้าง Docker Network ถ้ายังไม่มี
                sh "docker network create ${DOCKER_NETWORK} || true"
            }
        }

        stage('Run MongoDB') {
            steps {
                // รัน MongoDB Container
                sh "docker run -d --name mongo --network ${DOCKER_NETWORK} -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 mongo:latest"
            }
        }

        stage('Build & Run Backend') {
            steps {
                dir('backend') {
                    // Build Backend Image
                    sh "docker build -t wru_backend ."

                    // รัน Backend Container
                    sh "docker rm -f wru_backend-run || true"
                    sh "docker run -d --name wru_backend-run --network ${DOCKER_NETWORK} -p 30100:50100 wru_backend"
                }
            }
        }

        stage('Build & Run Frontend') {
            steps {
                // Build Frontend Image พร้อมส่ง Environment Variables
                sh "docker build --build-arg VITE_API_AUTH_URL=http://wru_backend-run:50100/api/auth -t wru_frontend ."

                // รัน Frontend Container
                sh "docker rm -f wru_frontend-run || true"
                sh "docker run -d --name wru_frontend-run --network ${DOCKER_NETWORK} -p 30101:5173 wru_frontend"
            }
        }

        stage('Test') {
            steps {
                // ทดสอบระบบ (ตัวอย่าง)
                sh 'curl -I http://localhost:30100/api/auth/check-auth'
            }
        }
    }

    post {
        always {
            // แสดงสถานะ Containers
            sh 'docker ps -a'
            sh 'docker network inspect ${DOCKER_NETWORK}'
        }
    }
}