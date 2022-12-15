## Day Name - Time Started - Time Ended

Brief description i guess of what is planned / happened.

## Wednesday 8:05 PM - 12:50 PM

Started work on project. Created basic pages without logic and adding basic css
styling

## Saturday 12/04 9:40ish AM - 11AM

Added basic user authentication and roles. Customized navigation bar and made it
diferent for users who are logged in and users who are not.

## Saturday 12/04 7pm

I added some checks to make sure if you are not logged in you cannot go to the
posts/new page. Added more checks and conditional to the templates for what
buttons to show users if they are loggin in or not.

Make sure that users cannot edit other peoples about section and made modals
work without page reload :).

## Sunday 10:30 AM - 12:40PM

Added the creation of posts and made a share / like button. Users who are not
logged cannot see the like button and users who are viewing there own post
cannot see it either. Showing the post creation date as well as the tags list.
The tags are simply a array of strings that hopefully can be searched.

Created the video demonstration for week2.

## Saturday 12/10 11:10 am 4hr

Added posts view to specific users page. Added Markdown view to the posts view.
Added some performance improvements and polish for slow internet connections.

Spinner added for loading for posts as well as user page. Toast notifications
added for 500+ errors on explore page.

## Sunday 12/11 10:33AM - 1:05

Added posts views. Sorted by stars descending. Limited the view to only 100
posts as well. Added display for markdown view. Now users can write posts in
markdown format and then it will be diasplayed as HTML in the view. However the
database still only shows the raw text.

Updated timesheet for previous days.

## Sunday 12/11 2:30P -> 4:50pm

Finally added like and dislike functionality to application. The like and
dislike methods will propoerly do authentication and validation to only cound a
single vote.

Furthermore cleaned up one of the `users` table to make it not store the actual
stars anymore. Instead now will be generated and computed whenever the profile
is visited.

Made video for second to last week presentation.

## Monday 12/12 3PM -> 3:30

Planned how comments should be structured and implimented in a non-relational
database like mongodb. I decided to go with them directly nested inside the Post
schema.

## Wed 12/14 10:45 AM - 2:05PM

Started implimenting comments into the Posts schema. Added comments as well as
styling changes to the code blocks. Added functionality to delete comments and
create them with a nice modal form.

## Wed 12/14 3:30PM - 5:33P

Implimented some changes to clean up the posts[ID] page. Seperated the logic for
the 3 modals into seperate files as well as added dispatch events to pass data
up the tree easier then simply reloading the page every time to force a database
reset.

Finally added the ability to edit and delete posts. Added some good
authentication checks to make sure users can only modify there content. Added
some nice UI effects for post updating as well as made it so the page does not
need to reload on each mutation of the database.

This is something that svelte really shines with. In Django I would need to do
alot more work to update the database without reloading the page.

Added a few more classes to the Global css for styling common buttons like
warning and danger buttons for the delete and update.

## Wed 12/15 12:20 -> 12:58PM

Created a readme.md file as well as updated the license.md file.
