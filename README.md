
![Logo](https://api-resource.hosseinimh.com/github/img/logo.svg)


# API Resource

A simple project powered by PHP Laravel framework as backend and React.Js and Bootstrap framework as frontend.

## When to use
API Resource is an online REST API that you can use whenever you need some fake data. It can be on a host, as a Wordpress plugin or to test things locally.


## Installation
As its a PHP Laravel project, first you need to install Composer then run this command in CMD:
```bash
composer create-project laravel/laravel api_resource
```

Project uses React.JS as frontend framework so, first you need to insall `NPM` then run this command in CMD:
```bash
npm run watch
```


### PHP Configuration

- Server

To run on server, move all folders and files except `public` to a new folder, named `frm` for example.
It should be one level upper than `public` folder for security reasons.

Open `.env` file in `frm` folder, and set database name, username and password of your database connection:
```bash
DB_DATABASE=api_resource
DB_USERNAME=root
DB_PASSWORD=123456
```

Move content of `public` folder to `public_html`.

- Server & localhost

Set `$localhost = 0;`  in `index.php`, in case you're running project on server:

```bash
  $localhost = 1; // set 1 if you're running project on localhost, otherwise 0
  $framework = $localhost === 1 ? '//../' : '//../frm/';
```

### JS Configuration
If you're using project on server, open `resources/js/constants/apiUrls.js`,
modify `LOCALHOST` value to 0 and `https://hosseinimh.com` to your server url:
```bash
const LOCALHOST = 1; // set 1 if you're running project on localhost, otherwise 0

export const SERVER_URL =
    LOCALHOST === 1
        ? "http://127.0.0.1:8000/api"
        : "https://hosseinimh.com/api";
```

#### Initialization
If you're on server, go to `/initialize`:
```bash
  GET /initialize
```
If you're on localhost, you have two options to initialize project:

- Go to `/initialize`
```bash
  GET /initialize
```
 - Or simply run custom console command:
  ```bash
  php artisan project:init
```
If everything goes well, the output will be like this:
```bash
Cache cleared successfully.
Old uploaded files deleted successfully.
Symbolic links created successfully.
Database tables created successfully.
1 user created successfully.
5 categories created successfully.
15 books created successfully.

****
Username: admin
Password: 1234
****

READY TO GO!
```

If you want not to reset your database data and initialize project anymore, just remove this line in `routes/web.php`:
```bash
  Route::get('initialize', [Controller::class, 'initialize']);
```
## API Reference

### Resources
#### Get all categories

```bash
  GET /api/categories
```
Returns list of all categories.

#### Get category
Returns a specific category.

```bash
  GET /api/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of category to fetch |

#### Get all books
Returns list of all books.
```bash
  GET /api/books
```

#### Get book
Returns a specific category.

```bash
  GET /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of book to fetch |

**Note:**
Resources have relations: Categories have many books. Below are tables schema:

![Logo](https://api-resource.hosseinimh.com/github/img/schema.jpg)

### Routes
`GET` HTTP method is supported.
## Documentation
#### Architecture
Project is based on MVC architecture, which Laravel recommends.
It uses Models, Controllers and js files as Views.

Coding schema of project is shown on picture below:
![Logo](https://api-resource.hosseinimh.com/github/img/architecture.jpg)

#### JWT Tokens
As API calls are stateless, so you can't use sessions to identify users.
I use `JWT tokens` to authenticate and authorize users.
On backend, I use `middlewares` to handle users accessing endpoint routes.


## Authors

- [@hosseinimh](https://www.github.com/hosseinimh)

API Resource was designed, implemented, documented, and maintained by Mahmouud Hosseini, a Full Stack developer.

- Email: hosseinimh@gmail.com

- Twitter: [@hosseinimh](https://twitter.com/hosseinimh)
## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hosseinimh.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahmoud-hosseini-553324217)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hosseinimh)


## 🚀 About Me
**Mahmoud Hosseini**

![Logo](https://api-resource.hosseinimh.com/github/img/hosseinimh.jpg)



I'm a Full Stack developer coding Php Laravel, React.JS, C#, ...

Learning programming for more 18 years.


## 🛠 Skills
Javascript, HTML, CSS, Sass, Bootstrap, Material UI, React.JS, React native, PHP Laravel, PHP Codeigniter, Wordpress, ...

