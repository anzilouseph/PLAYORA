using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Playora.Entity
{
    [Table("UserLevel")]
    public class UserLevel
    {
        [Key]
        public long UserLevelId { get; set; }   
        public string Name { get; set; } 
        public string Description { get; set; }
        public  bool IsDelete { get; set; }
        
    }
}
