# how we will password protect our admin panel

# 1. entry level

When we try to access the admin panel, we will be prompted to enter a password.
we will store the password in the database with hashed format.

> now the question is how to handle this situation in subsequent requests?

# 2. ui level modification password protection

there will be variety level of password protection
1. when creating, 
2. when editing
3. when deleting

and so we will put this specific password in the database with hashed format. and seek for it when necessary.

## things to consider

1. server and client side password. i mean when they accessed the admin panel for the first time, and for some reason, they reload the page, so we wont show them the password again. because they already provided the password. but in this serverless environment, how do we know that user already provided the password once and we wont need to validate again? or we may need to validate again in other scenarios? 