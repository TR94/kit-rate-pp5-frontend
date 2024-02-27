# KitRate
Kit Rate is a website for activity enthusiasts who want to research kit (products) before they buy. This site is building a community of active product testers who can provide the viewer an insight into a product with reviews and ratings which can help inform a buying decision. The initial release of this site is focused around Mountain Biking kit but it has been designed to be scalable to other sports and activities in the future. 

![KitRate site display - Desktop](/static/readme_files/kitrate_display.png)


## Links:
<a href="https://github.com/users/TR94/projects/4" target="_blank">Link to the GitHub project for KitRate</a>

<a href="https://github.com/TR94/kit-rate-pp5-frontend" target="_blank">Link to the Front End repository for KitRate</a>

<a href="https://kitrate-pp5-frontend-625b1b56e5cc.herokuapp.com/" target="_blank">Link to the Front End deployed site for KitRate</a>

<a href="https://github.com/TR94/kit-rate-pp5-backend" target="_blank">Link to the Back End repository for KitRate</a>

<a href="https://kitrate-pp5-backend-47910aa247ff.herokuapp.com/" target="_blank">Link to the Back End deployed site for KitRate</a>


# Development Planes
In order to develop this site in a guided and efficient manner, the five development planes have been considered. These are focused on design lead thinking and allow the critical elements of the site to be developed before committing to code. 

# Strategy
## Agile management:
To break the project down into manageable pieces, an Agile management approach has been taken which allows each user story to be addressed with defined tasks and acceptance criteria. 
The following user stories have been added into GitHub projects with the project board being used to manage the tasks in defined, manageable iterations. 

<a href="https://github.com/users/TR94/projects/4" target="_blank">Link to the GitHub project</a>

## User Experience
### Target audience:
This site is designed to be a central hub of product information for mountain bike enthusiasts. Users will be able to add products to the site and invite other users to leave their reviews. The target audience will be interested in researching a particular product before they buy to see how other people have rated it.

### Initiative: 
Create a space where users can review products independently providing real-life feedback to inform other people’s buying decisions. Initially the space will be focused on mountain biking but can be expanded in future. 

### User Groups: 
For this website there are two different user groups:
“Admin” - has the ability to edit and delete content that is deemed unsuitable
“Users” - people who want to view product reviews and/or leave their own reviews

### Epic 1:
The website needs an interactive UX which is intuitive to use and allows the users to:
* Sign in and sign out to keep personal information safe 
* Post a product for review 
* View products and review 
* Leave reviews on other products 
* Edit and delete their reviews 
* Have the ability to customise a feed with the categories/products they want to see
* Save products of interest into a space where they’re easy to find
* Allow admin to moderate reviews as required

### User stories:

#### User Authentication
Sign Up: As a user I want to be able to create a new account so that I can interact with the website.
	Acceptance:
1. A link for the user to follow to sign up
2. A page where to user can enter the required details to create an account
3. Confirm the account details are sent to the back end API and the Profile is created

Sign-In: As a user I want to be able to sign in to the app so that I can gain full access to all the features on the site.
	Acceptance:
1. A link for the user to follow to sign in
2. A page where the user can enter their sign-in details 
3. Confirm the request is sent to the back end API and authentication is successful
4. Full access to all the site’s features becomes available after signing in 

Logged in Status: As a user I want to be able to easily tell if I am logged in or not so that I can log in if I need to.
	Acceptance:
1. A clear indication of the users status such as site features missing, colour indication, etc. 

Refreshing access tokens: As a user I want to be able to stay logged in until I choose to log out so that I can maintain full access to all the site’s features.
	Acceptance:
1. Upon refreshing a page the user must stay logged in 
2. Upon navigating around the site the user must stayed logged in
3. After 10 minutes of inactivity the user must remain logged in

#### Navigation
Navigation: As a user I want to have a consistent and easy to use method of navigating between pages so that I can easily move around the site. 
	Acceptance:
1. A navigation bar that remains in the same place throughout the site

Routing: As a user I want to be able to navigate through pages in a seamless fashion so that I can continue to view content without waiting for pages to load. 
	Acceptance:
1. Pages will be created using React framework where components will refresh without the page reloading 
2. Whilst waiting for backend API responses, some kind of loading indication must be used

Conditional rendering: As a user I want to only see navigation links that are relevant to me and my logged in/out status so that I can not be distracted by buttons that I don’t need or cannot use.
	Acceptance: 
1. The main features of the site will not be available to users who are not logged in 
2. Upon logging in the navigation bar will display further features of the site and remove the sign-up and sign-in links

Avatar: As a user I want to view user's avatars so that I can easily identify users of the site.
	Acceptance:
1. Each profile must have the option for a user name and display photo

#### Adding & Saving Products
Create a product review: As a logged in user I want to be able to create a new product so that I can share my review of the product and invite others to share their experiences. 
	Acceptance:
1. A link to a product creation page must be easily visible
2. The production creation page must have:
* Image upload
* Product title
* Product description 
* First review 
* Star rating (out of 5)
3. Confirm data has been received by the backend API
4. Confirm data has been displayed on the site

View a product review: As a user I want to be able to view the details of a single product review so that I can learn more about it.
	Acceptance:
1. Page must display the details of the product 
2. Page must display the reviews with their individual ratings 
3. An overall rating should be displayed next to the product averaging out the individual reviews 

Save a product review: As a logged in user I want to be able to save a product review so that I can easily find it again in my own favourites collection.
	Acceptance:
1. Functionality to save an individual post by clicking a button on it
2. A dedicated page of products that have been saved by the user for their interest
3. The link to this collection should be in the navigation bar

#### The Products Page
Search products: As a user I want to be able to search the products with keywords so that I can find reviews that are of interest to me.
	Acceptance:
1. Easy accessible search bar 
2. Search bar successfully returns products based on keyword inputs

View most recent products: As a user I want to be able to view all the most recent products, ordered by most recently reviewed first so that I am up to date with the newest content.
	Acceptance:
1. Products displayed on the page in the most recent order

View saved products: As a logged in user I want to be able to view the products I’ve favourited so that I can find the reviews I’ve found useful. 
	Acceptance:
1. A dedicated page of products that havße been favourited by the user for their interest
2. The link to this collection should be in the navigation bar

View products of followed categories: As a logged in user I want to be able to view content filtered by a specific category so that I can keep up to date with new products of interest.
	Acceptance:
1. A category filter is present on the main page 
2. Filter only displays products related to a single category 

Infinite scroll: As a user I want to be able to have pages load quickly and content to load automatically as I scroll so that I don't have to click to move through the content. 
	Acceptance:
1. Loading spinner must be displayed whilst waiting for API responses to load components 
2. Whilst scrolling through content the next batch of reviews/products should load automatically

#### Feed page
Most followed categories: As a user I want to be able to see a list of the most followed categories so that I can see which categories are popular.
	Acceptance:
1. List of most popular categories displayed on the page 

Follow/Unfollow a category: As a logged in user I want to be able to follow and unfollow product categories so that I can see and remove products in my posts feed.
	Acceptance:
1. Functionality to follow / unfollow categories 
2. Confirm that following a category populates the feed page with products related to that category 
3. Confirm unfollowing a category removes the products from the feed page 

View all products in a specific category: As a user I want to be able to view all the products in a specific category so that I can explore that category or decide I want to follow it.
	Acceptance:
1. Category page present which shows all products associated with that category 
2. Page shows the following statistics about the category:
* Number of products 
* Number of followers 

#### The Product Review Page
Product Review page: As a user I want to be able to view the individual product page so that I can read the reviews about the product.
	Acceptance:
1. Clicking on the product will bring the user to the Product Review page related to that product
2. Page must display the following information about the product:
* Image
* Product title
* Product description 
* Individual reviews
* Average star rating (out of 5)

Edit product: As a product owner I want to be able edit my product title and description so that I can make corrections or update my product information after it was created.
	Acceptance:
1. If the user logged in owns the product, they’ll have the option to edit the content
2. Editing function automatically fills in the current information
3. Confirm upon submitting the new information, the backend API updates
4. Confirm the new information is displayed on the site

Create a review: As a logged in user I want to be able to add reviews to a product so that I can share my thoughts about the product.
	Acceptance:
1. Space on the Product page to leave a free text review 
2. Review should have an option to rate the product out of 5 stars

Review date: As a user I want to be able to see how long ago a review was made so that I know how old the review is
	Acceptance:
1. Review will have information stating the profile that made the review and when it was made

View reviews: As a user I want to be able to read reviews on products so that I can understand what other users think about the product.
	Acceptance:
1. Product page has facility to view reviews associated to that product 
2. Reviews are in date created order - newest first

Delete a review: As an owner of a review I want to be able to delete my review so that I can control my contributions to the site.
	Acceptance:
1. If the user logged in owns the review, they’ll have the option to delete the review
2. Delete function has a warning and confirmation before caring out the action
3. Confirm upon submitting the new information, the backend API updates
4. Confirm the new information is displayed on the site

Edit a review: As an owner of a review I want to be able to edit my review so that I can fix or update my existing content.
	Acceptance:
1. If the user logged in owns the review, they’ll have the option to edit the content
2. Editing function automatically fills in the current information
3. Confirm upon submitting the new information, the backend API updates
4. Confirm the new information is displayed on the site


#### The Category Page
Category page: As a user I want to be able to view a category specific page so that I can see more information about that category.
	Acceptance:
1. Clicking on a category link will direct to that category’s page

#### The Profile Page
Profile page: As a user I want to be able to view other users profiles so that I can see more information about them.
	Acceptance:
1. Clicking on a User’s avatar will direct to the their profile page

User profile - user stats: As a user I want to be able to view statistics about a specific user: bio, number of products owned, number of reviews made and their rating trends (count of 5 star, 4 star, etc ratings) so that I can make a judgement of how valid their content is.
	Acceptance:
1. Profile page must contain the following information related to the specific profile:
* Number of reviews made 
* Number of products owned 
* Rating trends
* Feed of products they own

Edit profile: As a logged in user I want to be able to edit my profile so that I can change my profile picture and bio
	Acceptance:
1. If the user logged in owns the profile, they’ll have the option to edit the content
2. Editing function automatically fills in the current information
3. Confirm upon submitting the new information, the backend API updates
4. Confirm the new information is displayed on the site

Update username and password: As a logged in user I want to be able to update my username and password so that I can change my display name and keep my profile secure
	Acceptance:
1. Functionality to update the username and/or password of the user logged in as required
2. Editing function automatically fills in the current information
3. Confirm upon submitting the new information, the backend API updates
4. Confirm the new information is displayed on the site

### Epic 2:
See back-end documentation for epic 2

<a href="https://github.com/TR94/kit-rate-pp5-backend" target="_blank">Link to the Back End repository for KitRate</a>

# Scope
Defining the scope at this stage allows the project to be clear on what the deliverables are before the detailed design start. 
Based on the strategy above and the agile management approach, the content requirements along with the acceptance criteria and tasks will be centred around the User Stories.
 
# Structure
The site-map allows the basic structure of the site to be developed based on the strategy and scope above. This depicts how the site will be constructed with a brief overview of the content for each page:
![KitRate Structure](/static/readme_files/.png)

The site interacts with a backend API database - the database model for this can be found in the backend documentation.

# Skeleton
Being able to freely design the layout of each page before committing to code allows much more freedom to make changes and visualise the final product. Using wireframes allows the building blocks of the page to be discussed and agreed upfront being being committed to code. This approach allows the design and initial release of the site to be much close to the final desired outcome.

Balsamiq was used to create the following wireframes:

## Home Page: 
Home page will render all the products showing statistics about them such as category, number of reviews, number of favourites, average rating, etc.
The Home page wireframes can be seen below, these consider the layout on a full size screen and a mobile screen:

![Home page wireframe - Desktop](/static/readme_files/.png)

![Home page wireframe - Mobile](/static/readme_files/.png)

## Product Page:
Clicking on a product will take the user to the product page. This gives a list of the reviews left by other users and also provides the opportunity for the user to leave their own review. 
The Product Page wireframes can be seen below in full size and mobile screen sizes:

![Product page wireframe - Desktop](/static/readme_files/.png)

![Product page wireframe - Mobile](/static/readme_files/.png)

## Add Product Page:
To add a new product to the site, users can navigate to this page. Allow the required information will be inputted through the form. 
The Add Product Page wireframes can be seen below in full size and mobile screen sizes:

![Add product page wireframe - Desktop](/static/readme_files/.png)

![Add product page wireframe - Mobile](/static/readme_files/.png)

## Feed/Favourites Pages:
The Feed and Favourites pages will be very similar to the home page however the data used to populate them will be filtered. The Feed page will consist of products from a category that the user has subscribed to and the Favourites page will be populated with products the user has favourited. 

# Surface
## Colour:
As with any site, branding is a key aspect to consider as this provides familiarity and association to users. For KitRate, there are no colours that naturally associate with the brand and therefore the colours have been chosen to be aesthetic but also fairly neutral. 

The pale pink (hex code: #FCCBC4) is the main banner colour for the site and is used in the NavBar. The background colour, light grey (hex code: #F8F8F8) is modern and stylish whilst remain discrete. Ascents of blue (hex code: #9ED6E7) are used throughout the site to draw attention to interactive parts of the site where required. 

![KitRate Colour Palette](/static/readme_files/palette.png)

## Font:
For the logo, a modern and clean looking text is used. GoogleFonts provides “Roboto” in a regular 400 weight option.
It is important to pair the title font with a complementing style for the main body of the website. GoogleFonts helped offer a suitable pairing and “DM Sans” was used, again in the regular 400 weight option.
These fonts have been included in the head of the index.html page through use of a content delivery network (CDN). The relevant styles modules contain the font-family styling and has a “sans-serif” back up font in case of an error with the CDN link.

## Images:
The images for the website are stored within the src>assets folder. The icons have been sourced from pre downloads whilst the hero image is from Pexels - a open source, free usage site. 
Images related to the database such as profile images and product images are stored using cloudinary which is a separate cloud based storage area. This is integrated into the backend API and feeds the database when image links are required. 

## Icons:
Font Awesome provides the icons for the site. Using a CDN, Font Awesome’s library of icons can be accessed through a link in index.html. This provides use of < i > tags to display icons. 

Icons are used across the site to improve user experience with easily recognisable and relevant visual cues. 

# Features
## Navigation and Logo
## Content for the home page
## Product component
## Popular Categories
## Creating a product
## Leaving a review
## Categories page  

## Features to add in the future
The profile page functionality is the next piece of work for this site. It would be great to be able to see a User’s profile and some statistics about their interaction with the page such as, how many reviews they’ve left. There are User Stories for this in the project board and it just needs to be planned into the next iteration. 

# Component usage
The React framework allows components to be created in a generic way so they can be reused across the project/projects. KitRate has several of these reusable components:
axiosDefaults: used to handle requests and responses to and from the API
Asset: used to handle on-screen loading symbol, image and messages to the user
PopularCategories: conditionally renders mobile or desktop format and displays categories in order of popularity. Used on the home, feed, favourites, category and product pages. 
MoreDropdown: gives access to editing functionality based on ownership and logged in user. Used for reviews and products. 
Review: template for displaying review content and rating. Mapped over to display the data as many times as required. 
Product: template for displaying product data such as image, title, description, etc. Mapped over to display the data as many times as required. 
Contexts: sets “globally” accessible data such as the logged in user (CurrentUserContext) and relevant category (CategoryDataContext) to be used as props in other pages. 

# Technologies Used
Coding languages used:
-   HTML5
CSS3
Python3
JavaScript including ES6
Frameworks:
React Bootstrap
Django REST  
Psycopg2
React 

# Libraries used
A variety of npm libraries have been used to enable functionality:
axios: used for interacting the with API
react-bootstrap: styling for the site with predefined styles for elements 
infinite-scroll-component: package for continuously loading data one API page at a time 
jwt-decode: used for web token management 
react-icons: icons accessible through react 
react-select: package for creating a drop-down options list 
react-simple-star-rating: package to implement an interactive star rating system 

## External resources used:
### Google Fonts
Imported into the project with a CDN link and fonts for the project implemented in the CSS files. GoogleFonts was also used for pairing fonts together to ensure they compliment each other.

### Font Awesome:
Imported into the project with a CDN link, all icons are sourced from Font Awesome.

### Am I Responsive?:
Used to check the look of the site at different screen sizes

### Balsamiq:
Wireframe tool for the initial layout designs.

### Git-Hub / Git-Pod:
Version control, file storage and cloud-based coding environment all provided by Git.

### Heroku 
Hosting platform linked into the GitHub repository which published a deployed site. 

### Cloudinary
Cloud based storage for images and static files which remains stable to ensure links stay open indefinitely. 

# Testing
## Manual Testing
### Functionality testing:
Thorough manual testing has been carried out to test the functionality of the site and ensure it is operating as expected. 

<a href=“…” target="_blank">Link to testing document</a>

### Accessibility
A key aspect of any site is making it available for all users. This can be tested using Lighthouse in Chrome Dev tools - the output of this test for KitRate is 94.

![KitRate Lighthouse](/static/readme_files/accessibility.png)

To make the site as accessible as possible the following has been implemented:
Aria-labels on links where possible
Alt attributes on the image

### Responsive testing:
The site is built using a Bootstrap framework meaning it is designed to be mobile first and therefore responsiveness is built in for the most part. 

Using Google Chrome Dev Tools, the responsiveness of the site can be tested through multiple view ports using a device emulator.

Testing was carried out using the following mobile devices; iPhone SE, iPhone XR, Pixel 5 and S20 Ultra. At the mobile screen sizes the app fits onto the screen properly, the NavBar collapses and the popular categories shrink down to 3 in order to keep the page decluttered.

There is one breakpoint where the popular categories move to the side of the page and the NavBar extends to full size. This means that desktop and tablet size screens are both suitable for this app along with mobile screens.

### Validator Testing 
Validation testing using W3C Mark-Up Validation Service: HTML for:
index.html - no errors
Validate JavaScript (https://validatejavascript.com/) validation service for:
axiosDefaults.js - no errors
Asset.js - no errors
Avatar.js - no errors
DisplayAvgRating.js - avg_rating not in camel case, refers to API fields and therefore must stay as is.
DisplayRating.js - no errors
MoreDropdown.js - error relating to onClick event must have a listener. Not a problem as this will be set up when using the component.
NavBar.js - profile_image and profile_id not in camel case, refers to API fields and therefore must stay as is.
NotFound.js - no errors
CategoryDataContext.js - category declared in upperscope - non issue
CurrentUserContext.js - ‘Promise’ not defined - non-issue, not a variable
useClickOutsideToggle.js = ‘document’ not defined - non-issue, not a variable
useRedirect.js - no errors
SignInform.js - signinup_hero not in camelcase - image reference only
SignUpForm.js - signinup_hero not in camelcase - image reference only
Categories.js - subscribe_id not in camel case, refers to API field and therefore must stay as is.
CategoryPage.js - pageCategory, categoryProducts, subscriptions, declared in upperscope - non issue. product_count, subscriptions_count, subscribe_id not in camel case, refers to API fields and therefore must stay as is.
PopularCategories.js - no errors
Product.js - API fields not in camelcase - non-issue. Nested ternary expressions - these are needed. onClick event must have a listener. Not a problem as this will be set up when using the component.
ProductCreateForm.js - URL and FormData not defined - non-issue, not a variable
ProductEditForm.js - API fields not in camelcase - non-issue.
ProductPage.js - API fields not in camelcase - non-issue. Nested ternary expressions - these are needed. ‘Promise’ not defined - non-issue, not a variable.
ProductsPage.js - various not defined - non-issue, not a variable
Profile.js - API fields not in camelcase - non-issue.
ProfilePage.js - no errors
Review.js - API fields not in camelcase - non-issue.
ReviewCreateForm.js - API fields not in camelcase - non-issue.
ReviewEditForm.js - API fields not in camelcase - non-issue.
utils.js - various not defined - non-issue, not a variable
App.js - profile_id not in camel case, refers to API fields and therefore must stay as is.
Index.js - “document” not defined - non-issue, not a variable
CSS for:
App.css - no errors
App.module.css - no errors
index.css - no errors
Asset.module.css - no errors
Avatar.module.css - no errors
Button.module.css - no errors
MoreDropdown.module.css - no errors
NavBar.module.css - no errors
NotFound.module.css - no errors
Product.module.css - no errors
ProductCreateEditForm.module.css - no errors
Profile.module.css - no errors
ReviewForm.module.css - no errors
Reviews.module.css - no errors
SignForm.module.css - no errors

# Bugs

## Solved bugs:
Number of reviews not displaying correctly:
* Solved after discovering a typo, correct prop referenced and issue fixed
2. Favourites list of products not correct:
Solved by adjusting the filter value and now displaying correctly. 
3. Subscription data not being handled correctly, not showing buttons as expected:
Ternary needed fixing with the right props based on the backend

## Unfixed Bugs
Issues still remaining in the GitHub project under Planned Future Work section. 
<a href="https://github.com/users/TR94/projects/4" target="_blank">Link to the GitHub project</a>
Order of home, feed and favourites pages:
Ordering not working for the product pages. “-created_at” isn’t resulting in a newest first list of products as expected. 
2. Form validation:
Although forms cannot be submitted without being completed, the on-screen prompts for the user explaining the issue aren’t always being displayed. The user experience will be improved if this can be fixed.
3. Subscribe/Unsubscribe buttons not refreshing after use:
After subscribing or unsubscribing using the button, the expected behaviour is for the button to toggle to the other option. This is currently happening, only updates once the page is refreshed. Poor UX and needs fixing. 
4. Product edit form category dropdown pre-populated:
Within the product edit form, the category dropdown option isn’t pre-populating with the current category data. Work around has been implemented for this but it would be a better user experience if this was populated correctly. 

## Console
See test document for console errors

# Deployment 

The project was developed using GitPod and all changes were pushed to GitHub to keep a version history and store the code. The website is deployed using Heroku which provides a link to the website once it has been published. 

It is recommended to deploy the barebones of the project onto Heroku as soon as possible to ensure the connections have been made before the development begins. For a react project this can be a single line of text to show the page is under construction.

Local deployment is from the Github repository using the following steps:
Clone the repository from Github using the “Code” button (or if you have an extension to GitPod, click this)
Open your IDE and link the Github repository to import the files
Command “npm start” will start the development server running - open the port.
There may be an error when connecting to the backend - you’ll need to allow the GitHub address from the development site to be allowed into the deployed back end site. Go to Heroku config vars for the back end and update CLIENT_ORIGIN_DEV with the GitHub address.
Restart the Heroku dyno and refresh dev site. 


### Heroku deployment for public use:
Login to your Heroku account and create a new app from the dashboard 
Connect the GitHub repository to the Heroku app 
In the deploy tab, you can enable automatic deployments linked to the GitHub repository 
Deploy the files using “Deploy branch” from main branch
Once the app has finished building, click “View” to open the app. 


# Credits 

Media:
Images were taken from Pexels

Code:
W3Schools and Stack Overflow helped with various coding challenges 
Code Institute for walk-through projects that this site is based on. A lot of the styling, components and pages are based on Code Institute examples. 

Acknowledgements:
Thank you to my mentor, Richard Wells, for his time, patience and guidance on the development of this website. 
Thanks also are given to the Code Institute Slack Community who are always on hand to help at a moments notice.
Thanks to the Code Institute tutor support who have been very persistent in helping with coding challenges throughout the project.
