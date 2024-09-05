using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace LibraryManagementAPI.Controllers
{

    [Route("api/books")]

    /*This attribute specifies that the class is an API controller, providing 
    automatic model state validation and routing support.*/
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        //Get all Books
        [HttpGet]
       
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<Book>), 200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<IEnumerable<Book>>> getBooks()
        {
            try
            {
                var books = await _context.Books.ToListAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new {
                    message = "An error occurred while retrieving the book.",
                    error = ex.Message });
            }
        }

        //Get Book by ID
        [HttpGet("{id}")]

        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Book),200)]
        [ProducesResponseType(typeof(object),404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<Book>> getBook(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    return NotFound(new { message = $"Book with ID {id} not found." });
                }
                else
                    return book;
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new
                {
                    message = "An error occurred while retrieving the book.",
                    error = ex.Message
                });
            }
        }

        //Create new Book
        [HttpPost]

        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Book),201)]
        [ProducesResponseType(typeof(object),400)]
        [ProducesResponseType(500)]
                public async Task<ActionResult<Book>> addBook(Book book)
        {
            if (book == null)
            {
                return BadRequest(new { message = "Book data is invalid." });
            }
            // Validating required fields
            if (string.IsNullOrWhiteSpace(book.Title) ||
                string.IsNullOrWhiteSpace(book.Author) ||
                string.IsNullOrWhiteSpace(book.Description))
            {
                return BadRequest(new { message = "Book data is invalid. Title, Author and Description are required." });
            }

            try
            {
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(getBook), new { id = book.Id }, book);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new
                {
                    message = "An error occurred while creating the book.",
                    error = ex.Message
                });
            }
        }


        //Update Book by ID
        [HttpPut("{id}")]

        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(Book),200)]
        [ProducesResponseType(typeof(object),400)]
        [ProducesResponseType(typeof(object), 404)]
        [ProducesResponseType(500)]

        public async Task<ActionResult<Book>> updateBook(int id, Book book)
        {

            
            // Validating required fields
            if (string.IsNullOrWhiteSpace(book.Title) ||
                string.IsNullOrWhiteSpace(book.Author) ||
                string.IsNullOrWhiteSpace(book.Description))
            {
                return BadRequest(new { message = "Book data is invalid. Title, Author and Description are required." });
            }


            try
            {
                // Checking if the book exists
                var existingBook = await _context.Books.FindAsync(id);
                if (existingBook == null)
                {
                    return NotFound(new { message = $"Book with ID {id} not found." });
                }

                else
                {
                    // Update the book's properties
                    existingBook.Title = book.Title;
                    existingBook.Author = book.Author;
                    existingBook.Description = book.Description;

                    // Save changes
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Book updated successfully." });

                }
                
            }
            catch (Exception ex)
            {

                return StatusCode(500, new
                {
                    message = "An error occurred while updating the book.",
                    error = ex.Message
                });
            }
        }

        //delete book by id
        [HttpDelete("{id}")]

        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(typeof(object), 404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> deleteBook(int id)
        {
            try
            {
                // Check if the book exists
                var book = await _context.Books.FindAsync(id);

                if (book == null)
                {
                    return NotFound(new { message = $"Book with ID {id} not found." });
                }
                else
                {
                    // Remove the book
                    _context.Books.Remove(book);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Book deleted successfully." });
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, new
                {
                    message = "An error occurred while deleting the book.",
                    error = ex.Message
                });
            }

        }





    }

}
