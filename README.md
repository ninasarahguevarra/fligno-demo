# fligno-demo
README

BACK END:

In this repo (recipe_backend) we are using laravel 8.83.27 and PHP 7.4.19 

Steps to setup in local machine

    Install composer
    Install mysql and apache (you can install lamp/xampp in your local machine)
    Clone this repo
    Make a copy of env (by copying .env.example), setup database connection in your env file
    Run Composer install
    Run Composer update
    Run php artisan key:generate
    Run php artisan migrate
    Run php artisan serve

FRONT END:
Framework used: Next JS
UI Framework: TailwindUI
CSS Framework: TailwindCSS
Repository: https://github.com/ninasarahguevarra/fligno-demo

Getting Started:

Copy this .env.local
    NEXT_PUBLIC_NODE_ENV=development
    NEXT_PUBLIC_APP_API_URL=https://api.edamam.com
    NEXT_PUBLIC_APP_BASE_URL = http://localhost:3000
    NEXT_PUBLIC_APP_NAME=Recipe
    NEXT_PUBLIC_APP_VERSION=1.0.0
    NEXT_PUBLIC_APP_ID=4cfaaf3f
    NEXT_PUBLIC_APP_KEY=4a8b914ba88abad70dc6ae2b07e5a8b8
    NEXT_PUBLIC_API_URL_DB=http://127.0.0.1:8000/api

Run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.


