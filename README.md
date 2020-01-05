-> PROJECT STRUCTURE

1. Domain - contain entities
2. Application - contain business logic
3. Persistence - database queries
4. API - api controllers

RUN THE PROJECT USING CLI
-> dotnet watch run

-> REFERENCE

1. Application -> Domain -> Persistence
2. Persistence -> Domain
3. API -> Application

Startup.cs - where we will add configuration

Run First Migrations
dotnet ef migrations add InitialCreate -p Persistence/ -s API/

RESET DATA IN DATABASE 
dotnet ef database drop -p Persistence/ -s Api/

GIT SETUP
1. git init
2. rm -rf .git -> remove .git
3. view hidden files in MacOS -> command + shift + .
4. git add . -> all changed files (staged)
5. git commit -m "your message"


<!-- Client-app State Management -->
npm i mobx mobx-react-lite