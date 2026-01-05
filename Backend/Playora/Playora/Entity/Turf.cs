using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Principal;
namespace Playora.Entity
{
    [Table("Turf")]
    public class Turf
    {
        public long TurfId { get; set; }
        public string TurfName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public bool IsDele { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }
    }
}
