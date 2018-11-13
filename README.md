# Glenwood Student Ministries Games Center

#### This project uses [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4

Games are a great way to connect with students. They can be the perfect tool for generating energy, building relationships, and showing newcomers how much fun a group is.

Unfortunately, sometimes picking a game or remembering all the rules can be a challenge. Which is exactly why [games.glewoodcc.org](http://games.glenwoodcc.org/) exists!

If you've never heard of it, [games.glewoodcc.org](http://games.glenwoodcc.org/) is a website Glenwood maintains as a library of all the games we play in our student ministries. The site was recently rebuilt from scratch and there are a lot of new improvements. Here are a few of the big ones:
*  It's optimized to work well on mobile devices
*  You can search/filter the entire list of games and get instant results
*  The games and their descriptions have been updated

But the biggest change is this: You can now contribute to the site!

There are two ways you can help out:
  1) Submit improvements to existing games:
      Each game has an "Improve" button on it's page. If you see a typo, a missing rule, or thought of a way to make it better, click on it and submit your feedback to help improve it for the next person.

  2) Submit new games:
      Don't see a game on the site? Heard about a cool new game? Made one up yourself? Go to [games.glewoodcc.org/contribute](https://games.glenwoodcc.org/contribute) and share it!

The site's been improved a lot, but having your input is what will keep it being a useful tool for years to come. Thanks!

## Project Location

[http://games.glenwoodcc.org](http://games.glenwoodcc.org/)

## Creating a Build
Run `ng build` from the project root to create a build. Add the `--prod` flag to compress for production. If deploying to a sub (non-root) folder on a domain, add the `--base-href` flag with the path to that folder as a parameter. Copy all the files from the dist folder to wherever you are deploying.

#### Deployment
If deploying on apache/nginx add the following code to a `.htaccess` file and place it with the other files in the deployed project root. This tells the server to redirect url's to the project root where the angular router can handle them.

```
<IfModule mod_rewrite.c>
  Options Indexes FollowSymLinks
  RewriteEngine On
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Games Data
The games data is stored in a js file located at the root of this project. When updated, it needs to be uploaded to https://nicolaosskimas.com/api/gsm-games-data.js. The app will load it as a global variable via a script tag in `index.html`. This implementation was chosen because the app is hosted on Glenwood's servers, which the developer does not have direct access to.