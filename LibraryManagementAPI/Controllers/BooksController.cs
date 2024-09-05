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
        public async Task<ActionResult<IEnumerable<Book>>> getBooks()
        {
            return await _context.Books.ToListAsync();
        }

        //Get Book by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> getBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            else
            return book;
        }

        //Create new Book
        [HttpPost]
        public async Task<ActionResult<Book>> addBook(Book book)
        {
           
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(getBook), new { id = book.Id }, book);
        }


        //Update Book by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> updateBook(int id, Book book)
        {
            // Check if the book exists
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }

            else
            {
                // Update the book's properties
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Description = book.Description;

                // Save changes
                await _context.SaveChangesAsync();

                return Ok("Updated Successfully");

            }
        }

        //delete book by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteBook(int id)
        {
            // Check if the book exists
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            else
            {
                // Remove the book
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                return Ok("Deleted Successfully.");
            }

        }





    }

}
