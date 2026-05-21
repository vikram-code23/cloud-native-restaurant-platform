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

                bat 'docker-compose down'

            }

        }

        stage('Build Containers') {

            steps {

                bat 'docker-compose up --build -d'

            }

        }

        stage('Show Running Containers') {

            steps {

                bat 'docker ps'

            }

        }

    }

}