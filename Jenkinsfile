pipeline {

    agent any

    stages {

        stage('Clone') {

            steps {

                git branch: 'main',
                url: 'https://github.com/vikram-code23/cloud-native-restaurant-platform.git'

            }

        }

        stage('Docker Down') {

            steps {

                sh 'docker compose down'

            }

        }

        stage('Docker Build') {

            steps {

                sh 'docker compose up --build -d'

            }

        }

    }

}
