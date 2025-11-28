using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Playora.Entity
{
    [Table("Login")]
    public class Login
    {
        [Key]
        public long LoginId { get; set; }   

        public string Email {  get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }

        public long RoleId { get; set; }
        public bool IsDelete { get; set; }

    }
}
