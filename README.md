# Cloud Native Restaurant Platform

A full-stack cloud-native restaurant ordering system built using Node.js, MySQL, Docker, Jenkins, Kubernetes and AWS.

## Features

- Customer food ordering system
- Category based menu
- Food images
- Cart management
- Table selection
- Checkout system
- Live order tracking
- Admin dashboard
- Real-time order updates using Socket.IO
- Docker containerization
- Jenkins CI/CD pipeline
- Kubernetes deployment
- AWS EC2 hosting

## Architecture

Frontend
- HTML
- CSS
- JavaScript
- Nginx

Backend
- Node.js
- Express.js
- Socket.IO

Database
- MySQL 5.7

DevOps
- Docker
- Docker Compose
- Jenkins
- Kubernetes (Kind)
- AWS EC2

## Project Structure

```text
cloud-native-restaurant-platform
│
├── frontend/
├── backend/
├── k8s/
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## Docker Deployment

```bash
docker-compose up --build -d
```

## Kubernetes Deployment

```bash
kubectl apply -f k8s/
```

## CI/CD Pipeline

1. GitHub Push
2. Jenkins Build Trigger
3. Docker Build
4. Docker Compose Deployment
5. Application Update

## Screenshots

## Screenshots

### Home Page
![Home](screenshots/home-page.png)

### Login Page
![Login](screenshots/login-page.png)

### Signup Page
![Signup](screenshots/signup-page.png)

### Menu Categories
![Menu Categories](screenshots/menu-categories.png)
![Menu Categories](screenshots/menu-categories2.png)

### Menu Items
![Menu Items](screenshots/menu-items.png)
![Menu Items](screenshots/menu-items-cart-msg.png)

### Cart
![Cart](screenshots/cart-page.png)

### Order Placed
![Order Placed](screenshots/cart-placed-page.png)

### Order Tracking
![Order Tracking](screenshots/order-tracking.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Jenkins CI/CD
![Jenkins](screenshots/jenkins-success.png)

### Kubernetes Pods
![Kubernetes](screenshots/kubernetes-pods.png)

### Docker Containers
![Docker](screenshots/docker-containers.png)

## Future Enhancements

- Monitoring with Prometheus
- Grafana Dashboard
- Kubernetes Ingress
- SSL HTTPS
- AWS EKS Deployment
- Auto Scaling

## Author

Vikram VK