# Scalable E-commerce API!

Using this API you can basically fit any kind of product to sell, that's how it's designed to work.
<br/>

## Features

* Powered by Prisma ORM
* Async operations
* Clean code

## Overview

Routes under _core_ directory handle the primary features:
<br/>
* [Authentication](https://github.com/TheOfficialLOE/NebulaShop#authentication)
* [Finding products](https://github.com/TheOfficialLOE/NebulaShop#finding-products)
* [Comment on products](https://github.com/TheOfficialLOE/NebulaShop#comment-on-products)
* [Vote comments( Like & Dislike )](https://github.com/TheOfficialLOE/NebulaShop#vote-comments)
* [Add to cart](https://github.com/TheOfficialLOE/NebulaShop#add-to-cart)
* [Purchase products](https://github.com/TheOfficialLOE/NebulaShop#purchase-product)

Routes under _cms_ directory handle Admin Panel operations( only admins and super admins have access to this part ):
<br/>
* [Add new brand](cms/routes/products.js)
* [Add new product](cms/routes/products.js)


### More features will be added to CMS soon...

## Workflow

### Authentication 
Authentication is pretty handy & simple, `/auth/register` and `/auth/login` are responsible for it, both methods require `Email` and `Password` in the request body. Once user is either registered or logged in, our system will generate a JWT in `x-auth-token` header.
<br/>
In order to register an admin user, you need to provide an acceptable JWT in `x-admin-token` with `SUPER_ADMIN` privileges.

### Finding products
There are basically 4 methods to find the products, you can get them all by `/products/`, get a group of products with the same brand by `/products:brand/`, or get a specific product by `/products/:brand/:product/`, and finally search products by `/products/search/` with a query. You can filter your search result by brand, minimum price, and maximum price.

### Comment on products
In order to comment on a product, you can send a POST request to `/comments/new/`, you will need `ProductId` and `Text` in the request body, and obviously you will need to be logged in.

### Vote comments
You can like or dislike a comment in `/vote/:product/:comment` and a `type` query to determine whether you are going to like it or dislike it.

### Add to cart
If logged in, you can get your cart items in `/cart/`. In order to add items, you need to provide `ProductId` and `Count` in the request body in `/cart/add/`. One thing to consider is that you can not have repeated items in cart, if you add an item which is already added in you cart, only the count will be updated.

### Purchase products
You can visit your purchase history in `/purchase/`, and to purchase a new item you can go to `/purchase/buy/` and provide `ProductId`, `Count`, and `Address` in the request body.
<br/>
P.S: Apparently I forgot to change the Remaining field in the database after a purchase, and I also forgot to modify the cart after a purchase.