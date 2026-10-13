pipeline {
    agent any

    environment {
        REPO_URL    = 'https://github.com/MaramMiadi/mini-cv.git'
        BRANCH      = 'main'
        PROJECT_DIR = 'nextjs-cv'
        NEXT_TELEMETRY_DISABLED = '1'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
                sh 'ls -la'
            }
        }

        stage('Install dependencies') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'node --version && npm --version'
                    sh 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
                }
            }
        }

        stage('Build') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        success { echo 'Pipeline terminé avec succès.' }
        failure { echo 'Le pipeline a échoué : consultez les logs.' }
    }
}