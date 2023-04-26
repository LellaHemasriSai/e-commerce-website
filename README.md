# e-commerce-website

# Introduction

This is a MERN stack based ecommerce application where there are three types of users - customers, sellers and advertisers who can perform their respective functionalities.



# Video Demonstartion

https://drive.google.com/file/d/1yir1N-bsp4n0NJ6Wn5FEMYzkndb4uWCY/view?usp=sharing

# Functionalities / Features

1. Registration and Login of Customer, Seller and advertiser.
2. Advertisements are shown in the home page
3. Customers and Sellers can add their bank accounts and modify them.
4. Seller can Add, modify and delete products.
5. Seller can Add, modify and delete warehouses.
6. Warehouse1 is starting point for all orders and warehouse5 is the final warehouse for every order.
7. Advertiser can Add, modify and delete coupons.
8. Products can be viewed in the ourStore page of customer.
9. Customers can search for the products.
10. Customer can add the products to wishlist.
11. Customer can add the products to cart.
12. Products in the cart can be modified in terms of quantity and can be deleted by the customer.
13. On checkout, customer will be prompted to choose a coupon and to select an account from multiple bank accounts.
14. If the amount at checkout is the less than the balance in the selected bank account, exception handling will take place.
15. If the amount is payable by selected bank, then a dummy interface of  RazorPay will be available for payment.
16. Once the payment is done, order is created at warehouse1 and the bank account is updated with the money.
17. In the myorders section, customer will be able to track the delivery.
18. If the customer wants to return the item, it can be done in myorders section.
19. Once the customer clicks the return button, the status changes to return indicating the initialization of return workflow.
20. Once the return workflow is done, the total income and sales section in the seller dashboard accordingly and the amount is credited back to the customer.
21. In the product list, seller can view the remaining quantity of items and sold items.
22. In the seller dashboard, one can view the total income and total number of sales in the form of graphs.




# How to use

1. Clone the repository
2. cd e-commerce-website
3. Open three terminals simulataneously
4. cd backend
5. npm run server
6. cd admin-app
7. npm start
8. cd frontend
9. npm start

