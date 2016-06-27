# Journal Club
[Heroku link][heroku]

[heroku]: http://www.herokuapp.com
## Minimum Viable Product
Journal Club is a web application inspired by RapGenius that will be built using Ruby on Rails and React.js. By the end of week 9, this app will, at minimum, satisfy the following criteria:

- [ ]  Hosting on heroku
- [ ] New account creation, login, and guest login/tour
- [ ] A production README that will replace this README
- [ ] Journal Articles
    - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling (using PDF reader plugin)
- [ ] Highlights
    - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Comments
    - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Journal Clubs/Groups
    - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Articles Model, API, and basic APIUtil (1 day, W1 Wed 6pm)

**Objective:** Articles can be added and destroyed through
the API.

- [ ] create `Article` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for Article (`ArticleController`)
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1 day, W1 Th 6pm)

**Objective:** Articles can be added and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `ArticleIndex`
  - [ ] `ArticleIndexItem`
  - [ ] `ArticleForm`

### Phase 4: Start Styling (1 day, W1 Fri 6pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Groups (1 day, W2 Mon 6pm)

**Objective:** Articles belong to Groups, and can be viewed in group.

- [ ] create `Group` model
- build out API, Flux loop, and components for:
- - [ ] jBuilder views for groups
  - [ ] Group CRUD
  - [ ] adding article requires a group
  - [ ] viewing articles by group
- Use CSS to style new views


### Phase 6: Highlights and Comments (1.5 days, W2 Wed 12pm)

**Objective:** Highlights and comments can be added to articles. Multple users can share a single highlight

- [ ] create `Highlight and comment` models and join table
- build out API, Flux loop, and components for:
  - [ ] fetching highlights and comments for articles
  - [ ] adding highlights and comments to articles
- [ ] Style new elements

### Phase 7: Search (.5 days, W2 Wed 6pm)

**Objective:** create dynamic search

- [ ] create search model
- build out API, Flux loop, and components for:
  - [ ] fetching search results
  - [ ] dynamically filtering search results
- [ ] Style new elements

### Phase 8: Styling Cleanup and Seeding (2 days, W2 Fri 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] User profile page
- [ ] hide/show other comments and highlights
- [ ] trending articles home page
 - [ ] questions
  - [ ] replies
