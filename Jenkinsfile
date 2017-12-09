node {
    checkout scm
    export PATH=/usr/local/bin
    stage('Build') {
        echo 'Building..'
        echo 'Installing packages'
        sh 'npm install'

        echo 'Running postgres and migrate'
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        echo 'Install client dependencies'
        sh 'cd client && npm install && cd ..'
        echo 'Start server'
        sh 'npm run startserver'
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run test'
    }
    stage('Deploy') {
        echo 'Deploying..'
        sh './dockerbuild.sh'
        sh 'cd provisioning && ./provision-new-environment.sh'
    }
}