using System.ComponentModel.DataAnnotations;

namespace Playora.Dto
{
    public class UserForUpdateDto   
    {
        [Required (ErrorMessage ="Name is required")]
        public string UserName { get; set; }
        public string Mobile { get; set; }
        public int Age { get; set; }

        [Required(ErrorMessage = "Emai is required")]
        public string Email { get; set; }
        public long UserLevelId { get; set; }
        public string? ProfileUrl { get; set; }
    }
}
