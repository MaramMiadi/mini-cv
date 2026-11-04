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

        stage('Start test PostgreSQL') {
            steps {
                sh '''
                    docker rm -f jenkins-test-postgres >/dev/null 2>&1 || true
                    docker run -d --name jenkins-test-postgres \
                      -e POSTGRES_USER=test_user \
                      -e POSTGRES_PASSWORD=test_password \
                      -e POSTGRES_DB=test_db \
                      -p 127.0.0.1:5433:5432 \
                      postgres:16-alpine
                '''
                sh '''
                    for i in $(seq 1 30); do
                      if docker exec jenkins-test-postgres pg_isready -U test_user -d test_db; then
                        exit 0
                      fi
                      sleep 2
                    done
                    echo "PostgreSQL test database did not become ready"
                    exit 1
                '''
            }
        }

        stage('API tests') {
            steps {
                dir("${PROJECT_DIR}/api") {
                    withEnv([
                        'DATABASE_URL=postgresql://test_user:test_password@127.0.0.1:5433/test_db'
                    ]) {
                        sh 'npx prisma migrate deploy'
                        sh 'npm test'
                    }
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
	
stage('Build Docker images') {
    steps {
        script {
            def gitSha = sh(
                script: 'git rev-parse --short HEAD',
                returnStdout: true
            ).trim()

            sh """
                docker build -t devsecops-portfolio:latest .
                docker build -t devsecops-api:latest nextjs-cv/api

                docker tag devsecops-portfolio:latest devsecops-portfolio:${gitSha}
                docker tag devsecops-api:latest devsecops-api:${gitSha}
            """
        }
    }
}
    }

    post {
        always {
            sh 'docker rm -f jenkins-test-postgres >/dev/null 2>&1 || true'
        }
        success {
            echo 'Pipeline terminé avec succès : tests frontend, tests API et build réussis.'
        }
        failure {
            echo 'Le pipeline a échoué : consultez les logs.'
        }
    }
}
