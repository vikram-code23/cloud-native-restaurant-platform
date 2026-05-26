pipeline {

    agent any

    stages {

        stage('Clone') {

            steps {

                git branch: 'main',
                url: 'https://github.com/vikram-code23/cloud-native-restaurant-platform.git'

            }

        }

        stage('Create Env File') {

            steps {

                sh '''
                echo "DB_HOST=mysql" > backend/.env
                echo "DB_USER=root" >> backend/.env
                echo "DB_PASSWORD=root" >> backend/.env
                echo "DB_NAME=vk_restaurant" >> backend/.env
                echo "DB_PORT=3306" >> backend/.env
                echo "PORT=5000" >> backend/.env
                '''

            }

        }

        stage('Docker Down') {

            steps {

                sh 'docker-compose down'

            }

        }

        stage('Docker Build') {

            steps {

                sh 'docker-compose up --build -d'

            }

        }

    }

}