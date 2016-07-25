# Journal Club



Journal Club is a website that facilitates a collective discussion of articles by allowing users to share and annotate articles together. In addition to creating their own highlights and comments, users can be part of a "Journal Club," where they can share articles as well as see all highlights and comments made by other members of the group.

[Live Here][live_url]

## Features
* Authentication
  * Session is authenticated on the backend, with session tokens being reset and reassigned upon every logout and login, respectively
  ![Login](images/login.png)
* Post articles
  * Articles can be created with a title, body, and optional source, background image and/or club
* Create clubs
  * User can create new clubs and add as many users as they'd like using real-time user search
  ![Create][gif_create]
* Create highlights/comments
  * User can add and delete highlights/comments on any article. If part of the group that posted the article, those highlights can be seen by other users in the group
* See all highlights/comments
  * If part of the group that posted the article, user can see all highlights and comments made by all other users in the groups
  ![Annotate][gif-annotate]
  * User can also reply to comments made by other users
* Edit articles
  * If user posted the article, user can edit/update the article title, body and photo
  * Can only update body if no annotations have been created yet
* Search articles, users, and groups
  * Real-time dynamic search bar that filters results based on input


## Languages, Frameworks and Libraries
* Ruby on rails
* PostgreSQL
* React
* Flux
* jQuery
* Gems
  * jBuilder
  * BCrypt

## Code Snips
Upon clicking the highlight button, document event listeners are added to obtain start and end points of user highlights.
```javascript
if (this.props.highlightState === true) {

  document.getElementById('ghost-article').addEventListener("mouseup", this._getHighlightCoords);
} else if (document.getElementById('ghost-article')) {
  document.getElementById('ghost-article').removeEventListener("mouseup", this._getHighlightCoords);
}
```

Highlight coordinates are obtained using event.anchorOffset and event.focusOffset.
```javascript
let target = window.getSelection();

let start = target.anchorOffset;
let end = target.focusOffset;
if (start !== end) {

  this._handleOverlap(start, end);
}
```

Coordinates are then compared to all existing user highlights to check for overlap. If so, then the original highlight is deleted and the new highlight is created. Note the multiple if/else statements, which though serve no use currently, will be used to improve highlight functionality in future versions.
```javascript
if (start > end) {
  end = [start, start = end][0];
}
let iterator = this.state.my_highlights.slice();
let created = false;
iterator.forEach(highlight => {
  let hlStart = highlight.start_index;
  let hlEnd = highlight.end_index;
  if (start < hlStart && end < hlEnd && end > hlStart) {
    HighlightsActions.deleteHighlight(highlight.id);
    end = hlStart;
  } else if (start > hlStart && start < hlEnd && end > hlEnd) {
    HighlightsActions.deleteHighlight(highlight.id);
    start = hlEnd;
  } else if (start < hlStart && end > hlEnd) {
    HighlightsActions.deleteHighlight(highlight.id);
  } else if (start > hlStart && end < hlEnd) {
    HighlightsActions.deleteHighlight(highlight.id);
  } else if (start == hlStart || end == hlEnd) {
    HighlightsActions.deleteHighlight(highlight.id);
  }
});
HighlightsActions.createHighlight({start_index: start, end_index: end, article_id: this.props.article.id});
```

When creating a comment, another event listener on the document gets the current y-position of the comment and computes a ratio based on the current height of the window which is then stored in the database.

```javascript
let ratio = (this.props.yCoord)/($('.show-body').outerHeight());
CommentsActions.createComment({body: this.state.body, article_id: this.props.articleId, ratio: ratio});
this.setState({body: ""});
this.props.hide();
```

Comments are then rendered on the page based on the current height of the window.This allow for comments to be rendered in the same position relative to where they were created when the window size changes.

```javascript
this.props.article.comments.forEach(comment => {
  if (comment.user_id === SessionStore.currentUser().id) {
    let pushed = false;
    let y = comment.ratio * $('.show-body').outerHeight();
    Object.keys(positionComments).forEach(position => {
      if ((parseFloat(position) - 25) < y && (parseFloat(position) + 25) > y) {
        positionComments[position].push(comment);
        pushed = true;
      }
    });
    if (!pushed) {
      positionComments[y] = [comment];
    }
  }
```

When rendering all highlights, multiple different layers are created for each user that are then placed behind the current layer.
```javascript
let allHighlights = HighlightsStore.highlightsByUser();
delete allHighlights[SessionStore.currentUser().id];
let layers = [];
Object.keys(allHighlights).forEach(user_id => {
  let body_string = this.props.article.body;
  let body_els = [];
  let i = 0;
  let color = colors.shift();
  allHighlights[user_id].forEach(highlight => {
    body_els.push(body_string.slice(i, highlight.start_index));
    body_els.push(<span className='all-highlights-text'
    style={{background: `${color}`}}>
    {body_string.slice(highlight.start_index, highlight.end_index)}</span>);
    i = highlight.end_index;
  });
  body_els.push(body_string.slice(i));
  layers.push(body_els);
});
return layers;
},
```

A transparent "ghost layer" was utilized so that the indices of text that the user is selecting when highlighting do not change as span tags are added. The article component listens to the highlights store such that every highlight triggers a re-rendering of the article component.

```javascript
<div className='ghost-article-wrap'>

  <div className='show-body'>
    {this._renderMyComments()}
    {allComments}
    <CommentsForm commentState={this.props.commentState} showForm={this.props.showForm} yCoord={this.state.yCoord} articleId={this.props.article.id} hide={this._hide}/>
    <div id='ghost-article' onClick={this._handleClickDelete}>
      {this.props.article.body}
    </div>
    {layers}
    <div id='article'>
      {this._createBody()}
    </div>
    {comment}
  </div>
</div>
```



## Design Docs
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md







[live_url]: <http://myjournal.club>
[gif_create]: <http://g.recordit.co/9aEOVIECRI.gif>
[gif-annotate]: <http://g.recordit.co/Wfgc7wxUNz.gif>
