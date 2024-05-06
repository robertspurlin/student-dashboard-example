## Student Dashboard
A Laravel instance driving a front-end built in Vue 3 using Pinia, Vuetify for styling, and Vitest for testing. 

## Quick Start
This was built using Laravel Sail, a set of Docker containers that come with all server dependencies installed for you. However, you will still need to build all of the app dependencies. 

Within the directory that you've cloned the repository in, spin up a helper Docker container that will install all of our Composer dependencies (including Laravel Sail), and then remove itself. The command to do such a thing (using PHP 8.3) is below:

```
docker run --rm \
    -v "$(pwd)":/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    bash -c "composer install --ignore-platform-reqs"
```

After the helper Docker container is complete installing everything, starting both containers for the application should be as easy as running this command in the directory:

```
./vendor/bin/sail up -d
```

When the containers are running, we need to run the NPM and database seeding commands in the `laravel.test` container. Within the container -
```
npm install
npm run build
```

To create the database table and seed it with fake data, run these commands (also in the same container) -
```
php artisan migrate:fresh
php artisan db:seed
```

Finally, navigate to `localhost` in a browser. 

## Testing
Within the `laravel.test` container - 

```
npm run test
```

(A note here - I wrote tests for every action within the Pinia store, but wasn't able to get all of them to pass without a refactor on how the ajax calls are working. I decided to comment them out in the interest of sending the project in a timely manner - I left all of the tests in place for reading pleasure.)

## Notes

- This is an SPA running vue-router. There are only three routes - root (/), Create New Student (/create), and a catch all for all routes that don't match.
- I wrote the form component to be reusuable between both the main page's edit functionality and the create student page.
- Within the form component, there is proper validation on all fields.
- There is also error and success handling on all actions - if the action fails, there is a red snackbar notification at the bottom of the page, and if it succeeds, there is a green snackbar notification.
- I committed the .env file for ease of building. 

<hr />

I thank you for your time and consideration, and I look forward to meeting with you all! If there are any questions and/or concerns, please feel free to reach out. 
- Robert Spurlin