node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        echo ''
        echo 'Running postgres and migrate'
        echo 'My location is...'
        pwd
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        echo ''
        echo 'Installing dependencies'
        sh 'yarn install'
        echo 'Install client dependencies'
        sh 'cd client && yarn install && cd ..'
        echo ''
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