# Phone Catalog  
*Node JS Exercise and Proof of Concept*

See [https://phonecatalog.52.74.136.51.nip.io/](https://phonecatalog.52.74.136.51.nip.io//)

![Phone Catalog!](screenshot.png?raw=true "Phone Catalog")

## Software Libraries and Tools
### NextJS 
[NextJS](https://nextjs.org/) is a React Framework that helps developer became more  productive. 
###TypeORM
An Object-Relational Mapping for NodeJS
## Standards
 ###GraphQL
 This project is using GraphQL as its API Endpoint. See [https://graphql.org/](https://graphql.org/)
 ###OAuth
 For authentication, for the moment supports Google OAuth authentication. Other providers can be easily added

## Storage
###Postgres
This project is using Postgres Database Server

###Cloud Storage 
All images uploaded are stored on a Google Cloud Storage Bucket 
(initial data images are taken from phonesdata.com ). 
Any further uploads are now stored in Cloud Storage

## Deployment

###Docker
This project is using Layered Docker images for faster building and deployment

###Kubernetes
It is deployed in a Kubernetes Cluster using the GitOps principle by ArgoCD [https://argoproj.github.io/argo-cd/](https://argoproj.github.io/argo-cd/)

Ingress are automatically secured by
[Lets Encrypt](https://letsencrypt.org/)


See [https://phonecatalog.52.74.136.51.nip.io/](https://phonecatalog.52.74.136.51.nip.io//)

