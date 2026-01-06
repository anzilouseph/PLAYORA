using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Playora.IRepository;

namespace Playora.Controllers
{
    [Route("api/AdminManagement")]
    [ApiController]
    public class AdminManagementController : ControllerBase
    {
        private readonly IAdminManagementRepository _repo;
        private readonly IUserManagementRepo _userRepo;

        public AdminManagementController(IAdminManagementRepository repo,IUserManagementRepo userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        [Authorize]
        [HttpGet ("get-all-user")]
        public async Task<IActionResult> GetAllUsersByAdmin()
        {
            try
            {
                //var roleClaim = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sub);
                var userIdClaim = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sid);

                if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out long userId))
                {
                    return Unauthorized("Unable to Generate JWT");
                }
                var roleCheck = await _userRepo.GetOwnProfileById(userId);
                if(roleCheck.data.RoleName!="admin")
                {
                    return Unauthorized("Unauthorized");
                }
                var apiResponse = await _repo.GetAllUserByAdmin();
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        //for get user by id by admin
        [Authorize]
        [HttpGet("get-user-by-id")]
        public async Task<IActionResult> GetUserByIdAdmin(long id)
        {
            try
            {
                //var roleClaim = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sub);
                var userIdClaim = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Sid);

                if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out long userId))
                {
                    return Unauthorized("Unable to Generate JWT");
                }
                var roleCheck = await _userRepo.GetOwnProfileById(userId);
                if (roleCheck.data.userLevelName != "Admin")
                {
                    return Unauthorized("Unauthorized");
                }
                var apiResponse = await _repo.GetUserByAdmin(id);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
