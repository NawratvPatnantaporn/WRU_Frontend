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
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [[$class: 'CleanCheckout']],
                    userRemoteConfigs: [[credentialsId: 'Nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Project.git']]
                ])

                dir('backend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[credentialsId: 'Nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Backend.git']]
                    ])
                }
            }
        }

        stage('Verify Files') {
            steps {
                sh 'ls -la'          
                sh 'pwd'             
                sh 'find . -name Dockerfile'  
            }
        }

        stage('Prepare Network') {
            steps {
                sh "docker network inspect ${DOCKER_NETWORK} || docker network create ${DOCKER_NETWORK}"
            }
        }

        stage('Run MongoDB') {
            steps {
                sh "docker rm -f mongo || true"  
                sh "docker run -d --name mongo --network ${DOCKER_NETWORK} -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 mongo:latest"
            }
        }

        stage('Build & Run Backend') {
            steps {
                dir('backend') {
                    sh "docker build -t wru_backend ."
                    sh "docker run -d --name backend --network ${DOCKER_NETWORK} -p 30100:50100 wru_backend"  // ✅ เปลี่ยนชื่อ Container เป็น "backend"
                }
            }
        }

        stage('Build & Run Frontend') {
            steps {
                // ✅ ใช้ชื่อ Service "backend" ใน Docker Network
                sh "docker build --build-arg VITE_API_AUTH_URL=http://backend:50100/api/auth -t wru_frontend ."
                sh "docker run -d --name wru_frontend-run --network ${DOCKER_NETWORK} -p 30101:5173 wru_frontend"
            }
        }

        stage('Test') {
            steps {
                sh 'curl -Is http://localhost:30100/api/auth/check-auth | head -n 1'
                sh 'docker logs backend --tail 50'  // ✅ เปลี่ยนชื่อ Container เป็น "backend"
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
