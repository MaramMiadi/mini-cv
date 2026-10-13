pipeline {
    agent any

    environment {
        REPO_URL    = 'https://github.com/MaramMiadi/mini-cv.git'
        BRANCH      = 'main'
        PROJECT_DIR = 'nextjs-cv'
        NEXT_TELEMETRY_DISABLED = '1'
        NODE_OPTIONS = '--dns-result-order=ipv4first'
        NPM_CONFIG_FETCH_RETRIES = '5'
        NPM_CONFIG_FETCH_RETRY_MINTIMEOUT = '20000'
        NPM_CONFIG_FETCH_TIMEOUT = '300000'
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
                    retry(3) {
                        sh 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
                    }
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