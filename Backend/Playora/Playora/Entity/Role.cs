using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Playora.Entity
{
    [Table("Role")]
    public class Role
    {
        [Key]
        public long RoleId { get; set; }    
        public string RoleName { get; set; }    
        public  string Description { get; set; }    
        public bool IsDelete { get; set; } 
    }
}
