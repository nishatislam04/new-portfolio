# how we will password protect our admin panel

## 1. entry level

When we try to access the admin panel, we will be prompted to enter a password.
we will store the password in the database with hashed format.

> now the question is how to handle this situation in subsequent requests?

### 2. ui level modification password protection

there will be variety level of password protection:

1. when creating
2. when editing
3. when deleting

and so we will put this specific password in the database with hashed format. and seek for it when necessary.

## things to consider

### story flow

1. when user try to access any pages of the admin url, we seek for password
  either it is main page or subpage. so all the page can be only accessed when they provide password
  figure out how subpage should not seek for password if password already provided
  but it can seek for password if user try to access subpage directly

2. now since we dont have a session, how do we know if this current request already provided password?
  maybe cookies solution. figure out if this is the correct and straightforward approach or not.
  if there are any security holes in this approach or not
  like can we just inject a cookie and get access to admin panel or not
  or is there any other better solution available or not

3. database:
  table: admin_password
  columns:
    - id (primary key) [just manually put 1]
    - entry_password
    - create_password
    - update_password
    - delete_password

4. forgot password
  since we have resend setup in our project, clicking a button would send a email
  with a link to reset the password
  there will be a quiz to answer before resetting the password
  