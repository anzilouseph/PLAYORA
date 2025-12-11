using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Playora.Dto;
using Playora.IRepository;

namespace Playora.Controllers
{
    [Route("api/UserManagement")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementRepo  _userManagementRepo;
        public UserManagementController(IUserManagementRepo userManagementRepo)
        {
            _userManagementRepo = userManagementRepo;
        }

        [HttpPost ("create-user")]
        public async Task<IActionResult> CreateUser (UserForCreationDto user)
        {
            try
            {
                var apiResponse = await _userManagementRepo.UserCreation(user);
                return Ok(apiResponse); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
        }

        //for get user his owin profile
        [HttpGet ("get-own-profile")]
        public async Task<IActionResult> GetOwnProfile()
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sid);
                if(userIdClaim == null || !long.TryParse(userIdClaim.Value,out long userId))
                {
                    return Unauthorized("Unable to generate Jwt");
                }
                var apiResposne = await _userManagementRepo.GetOwnProfileById(userId);
                return Ok(apiResposne);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
}
