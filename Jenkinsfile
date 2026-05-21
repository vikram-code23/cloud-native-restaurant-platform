pipeline {

    agent any

    stages {

        stage('Clone Repository') {

            steps {

                git branch: 'main',
                url: 'https://github.com/vikram-code23/cloud-native-restaurant-platform.git'

            }

        }

        stage('Stop Old Containers') {

            steps {

                sh 'docker-compose down'

            }

        }

        stage('Build Containers') {

            steps {

                sh 'docker-compose up --build -d'

            }

        }

        stage('Show Running Containers') {

            steps {

                sh 'docker ps'

            }

        }

    }

}