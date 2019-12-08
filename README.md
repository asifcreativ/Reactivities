-> PROJECT STRUCTURE

1. Domain - contain entities
2. Application - contain business logic
3. Persistence - database queries
4. API - api controllers

-> REFERENCE

1. Application -> Domain -> Persistence
2. Persistence -> Domain
3. API -> Application

Startup.cs - where we will add configuration

Run First Migrations
dotnet ef migrations add InitialCreate -p Persistence/ -s API/

GIT SETUP
1. git init
2. rm -rf .git -> remove .git
3. view hidden files in MacOS -> command + shift + .
