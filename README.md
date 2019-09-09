## Easy React Pagination

### What Is It?

A simple component that makes pagination in ReactJS incredibly easy!

### How To Use

Clone the project or copy the code from the Pagination component into your project.
The project uses bootstrap CSS and the fortawesome react module as dependencies. Make sure there is a link to bootstrap somewhere, preferable index.html and that you run npm install.

From then you just need to import the component wrap and embed your display component as children.

### Reference

The Pagination component takes the following props:

data (required) - An array of input data that you wish to be paginated

recordsPerPage(required) - A number representing how many elements of data you want per pagination,

range (optional) - A number representing how many page numbers are displayed at one time e.g. a range of 5 will give links of 1,2,3,4,5
and then clicking 2 will give 2,3,4,5,6 etc. Not passing a number here will result in all page numbers being visible

### Bugs, Suggestions and Improvements

Please report any bugs. Suggestions and improvements are both welcomed and encouraged

