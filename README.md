# Scalable E-commerce API!

Using this API you can basically fit any kind of product to sell, that's how it's designed to work.
<br/>

**Features:**
<br/>
* Powered by Prisma ORM
* Async operations
* Clean code

**Workflow:**
<br/>
Routes under _core_ directory handle the primary features:
<br/>
* [Authentication](core/routes/auth.js)
* [Finding products](core/routes/main.js)
* [Comment on products](core/routes/comments.js)
* [Vote comments( Like & Dislike )](core/routes/vote.js)
* [Add products to cart](core/routes/cart.js)
* [Purchase products](core/routes/purchases.js)

Routes under _cms_ directory handle Admin Panel operations( only admins and super admins have access to this part ):
<br/>
* [Add new brand](cms/routes/products.js)
* [Add new product](cms/routes/products.js)


P.S:More features will be added to CMS soon...

