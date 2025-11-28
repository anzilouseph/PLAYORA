using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Playora.Entity
{
    [Table("UserMaster")]
    public class UserMaster
    {
        [Key]
        public long UserId { get; set; }
        public string UserName { get; set; }    
        public string Mobile {  get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string ProfileUrl { get; set; }  
        public long UserLevelId { get; set; }   
        public bool IsDelete { get; set; }  

    }
}
