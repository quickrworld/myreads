# MyReads Project

The 'MyReads' application code can be cloned from its github repository
and deployed and executed on a test server using simple steps:

1. `cd` to a directory where you want to create the project directory
2. Use
`git clone https://github.com/quickrworld/myreads.git`
to clone the repository
3. Use `cd myreads` to change your working directory to the
project root directory
4. Install all project dependencies with `npm install`
5. Start the development server with `npm start`

The main page can be viewed by navigating the browser to
`http://localhost:3000`

If you change any of the defaults the above commands may have to be
modified accordingly. See the documentation of the commands for further
information.

The application allows the user to view books categorized under
three bookshelves -- Currently Reading, Want to Read, and Read.
The user can move a book from one shelf to another by selecting
the target bookshelf using a drop down. A book can be removed from
all shelves by choosing 'none' as the target.

Users can navigate to a search page that allows searching for books.
The search matches the user provided text with book authors
and titles. The demo server has some limitations on what words are
matched. Books can also be reassigned shelves from the search
results page.

Clicking on any book image on the main page or the search results page
displays additional details about the book in a new book details page.


Navigation is intuitive and refreshing the browser re-displays the
information. Categorizing a book on the main page or the search page
results in the book being categorized accordingly in all other pages.
Data is persisted and all application pages use the same information
about each common object.

The project uses the following components:

* App - The entry point that hosts the application
* BookShelves - Hosts the three bookshelf components
* BookShelf - One bookshelf per category
that displays matching category books 
* Book - Displays the book image and some details
and allows categroization 
* BookDetails - Provides details about the book
* SearchBooks - Allows user to specify a search term
and displays matching books
* Log - Displays error messages to the user in case any action fails
* ScrollToTopOnMount - Scrolls to the display to the top of the window
