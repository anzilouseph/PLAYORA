namespace Playora.Dto
{
    public class UserForCreationDto
    {
        public string UserName { get; set; }
        public string Mobile { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public long UserLevelId { get; set; }
        public string? ProfileUrl { get; set; }
        public string Password { get; set; }

    }
}
