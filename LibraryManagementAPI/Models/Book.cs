using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LibraryManagementAPI.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        //Id can only be set by the backend and cannot be set in the request body.
        public int Id { get; private set; }


        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Title must be between 1 to 50 characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Description must be between 1 to 100 characters.")]
        public string Description { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Author must be between 1 to 50 characters.")]
        public string Author { get; set; }


    }
}
