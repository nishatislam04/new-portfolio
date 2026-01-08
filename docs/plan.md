# this is our plan for the portfolio of new era

## write here the admin panel ui story

there will be a sidebar with multiple items. and clicking one of it would render a page.
if we already have the resource available on the database, we will pre-populate the form at edit page.
otherwise we will show the create form for that section.
there will be a delete option when the edit form is shown.
  clicking on it will show a form input with password seeking confirmation
  upon confirmation, we will send an email about the resource being deleted

1. create user info form
  a form containing necessary input fields to create a user
  and this form input field will write into `user` and `profile` model
2. create a social link form
3. create a work experience form
4. create a education form
5. create a profile stats form
6. create achivement Form
7. create a tape word form

## the form input fields

1. user form

- first name
- last name
- full name (will be saved on `name` field in `User` model)
- email (save on both `User` and `Profile` models)
- title (designation)
- bio
- phone
- locationLabel
- locationLink
- availability

~ (slug: will be handled on the backend based on full name)
~ (we wont put skills input field in this form)
~ (we wont put tech stack input field in this form)

2. social link form

- label
- url
- icon (file input)
- kind (dropdown: contact, footer)
- sort order (number input)

~ (save the `icon` in the vercel-blob and store the url in `icon` field)

3. work experience form

These fields contribute to a single work experience card.

- company
- position
- location
- type (dropdown: full-time, part-time, contract, internship, volunteer)
- durationLabel (string input like "July 2024 - Current")
- startLabel (string input)
- endLabel (string input)
- description (textarea)
- isCurrent (boolean dropdown: yes, no)
- sort order (number input)
- achievements (array of strings as json)
- technologies (array of strings as json with icon support)

~ (technologies will be stored in vercel blob with icon)

4. education form

These fields contribute to a single education card.

- institution
- degree
- durationLabel (string input like "2021 - 2024")
- startDate
- endDate
- gpa (string like "3.8/4.0")
- description (optional)
- sort order (number input)
- highlights (array of strings as json. like what we have achieved)

5. profile stats form

- experienceLabel (string input with "1+")
- projectsCompletedLabel (string input with "10+")
- technologiesLabel (string input with "50+")
- clientSatisfactionLabel (string input with "100%")

6. achievement form

These fields contribute to a single achievement card.

- info (string input)
- number (string input)
- text (string input)

7. tape word form

- value (string input)
- sort order

### checklist

- [x] database working
- [x] prisma working
- [x] create prisma schema
- [x] add a detailed docs about the schema
- [] plan about the admin panel ui where we can manage the portfolio like adding projects, skills, etc.
- [] implement the admin panel ui
- [] the portfolio is properly managed via admin panel
- [] add a password protection to the admin panel
- [] update projects-section like refactor it with shadcn components and modularize it
