pipeline {
    agent any
    environment {
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
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
                print "Checkout"
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[credentialsId: 'nawarat', url: 'https://github.com/NawratvPatnantaporn/WRU_Frontend.git']]
                ])
                print "Checkout Success"
            }
        }
        stage('Build') {
            steps {
                echo "Docker Build Image"
                script {
                sh "docker build -t WRU_Frontend ."
                echo "Docker Build Image Success"
                }

                echo "Docker Image Run Container"
                script {
                    sh "docker rm -f WRU_Frontend-run || true"
                    sh "docker run -d --name WRU_Frontend-run -p 54100:3000 WRU_Frontend"
                    echo "Docker Image Run Container Success"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Test..'
            }
        }
    }
}
