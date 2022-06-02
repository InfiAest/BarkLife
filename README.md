# Bark Life - Semester Project 2
<p align="center">
  <img src="https://user-images.githubusercontent.com/71286689/171390220-3154fb38-f500-433b-8d9e-9c1d8cff64d6.png" alt="Bark Life homepage" />
</p>

## Description
Create an e-commerce website that has both customer-facing and admin sections. Both sections should be responsive and the website will be populated by a Strapi API supplied by Noroff or by the API created in level 2 of the assignment.

### Project requirements
#### ***Home page must include:***
- A hero banner with an image that is uploaded to Strapi.
- A list of featured products. On Strapi products can be marked as ‘featured’. When a product is marked as ‘featured’ it should be displayed on the homepage.

#### ***Products page must include:***
- A list of all products added to Strapi. Each product must display its title, price and image. The product should link to its products detail page.
- A search text box. When searching (filtering), only the products that include the searched text in their title or description should be listed.

#### ***Product details page***
This page is reached by a user clicking on a product on the product list page. The product details page must include; title, description, image, price and an add to cart button(this will toggle the product in and out of a cart array stored in local storage).

#### ***Cart/Basket page***
Must display a list of all products added to the cart. Load the items that have been added to local storage and display them on the page. If the cart is empty display a message indicating this.<br/>
Each product in the cart must display; title, price, a link to the product view page and image.<br/>
After the list of products, display the total price of all the products in the cart.<br/>

Note: the cart page is not a checkout page. No payments or user details are required to be taken.

#### ***Admin section***
The admin section (apart from the log in form) must only be accessible to logged in admin users and must include the following features.

##### ***Login/Logout***
Create an admin login form that allows administrator users to login. Use local storage to keep the user logged in.<br/>
When logged in, display a logout button in the layout that logs the user out. Logging out should not clear the cart.

##### ***Add/edit products***
Create form(s) that allow products to be added and edited. The form must allow the user to toggle whether a product is featured.

#### ***Delete existing product***
Allow products to be deleted. Before a product is deleted you must display a confirmation dialog. The product should only be deleted if the user confirms.


### Level 2 (optional)
Create your own API for the site. You can use any backend stack (e.g. Strapi, Wordpress REST API, Firebase, etc) but it MUST be publicly hosted on a server.<br/>
The API must include all the functionality in the provided Strapi API and you can add any additional functionality.<br/>
It MUST be publicly hosted and accessible, you cannot submit a custom API with your frontend code.

#### ***Login details:***
Username: admin@admin.com<br/>
Password: Pass1234

## Built With
![Strapi](https://img.shields.io/badge/-Strapi-white?style=for-the-badge&logo=Strapi&logoColor=4e26e0)
![React](https://img.shields.io/badge/-React-white?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/-JavaScript-white?style=for-the-badge&logo=javascript)
![SASS](https://img.shields.io/badge/-Sass-white?style=for-the-badge&logo=sass)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:InfiAest/BarkLife-semproj2.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following commands:

```bash
npm run start
```

## Contact

[![Linkedin Badge](https://img.shields.io/badge/-CharlotteLucas-white?style=for-the-badge&logo=Linkedin&logoColor=0077b5&link=https://www.linkedin.com/in/charlotte-lucas-31544b32/)](https://www.linkedin.com/in/charlotte-lucas-31544b32/)
[![Instagram Badge](https://img.shields.io/badge/-Infiaest-white?style=for-the-badge&logo=instagram&link=https://instagram.com/infiaest/)](https://instagram.com/infiaest)
