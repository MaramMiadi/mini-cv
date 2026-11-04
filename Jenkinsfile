pipeline {
    agent any

    environment {
        REPO_URL    = 'https://github.com/MaramMiadi/mini-cv.git'
        BRANCH      = 'act4'
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

        stage('Install frontend dependencies') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend tests') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'npm test -- --run'
                }
            }
        }

        stage('Install API dependencies') {
            steps {
                dir("${PROJECT_DIR}/api") {
                    sh 'npm ci'
                }
            }
        }

        stage('API tests') {
            steps {
                dir("${PROJECT_DIR}/api") {
                    sh 'npm test'
                }
            }
        }

        stage('Build frontend') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès : tests frontend, tests API et build réussis.'
        }
        failure {
            echo 'Le pipeline a échoué : consultez les logs.'
        }
    }
}
