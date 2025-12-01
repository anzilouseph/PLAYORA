using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Playora.Dto;
using Playora.IRepository;

namespace Playora.Controllers
{
    [Route("api/AuthenticationManagement")]
    [ApiController]
    public class AuthenticationManagementController : ControllerBase
    {
        private readonly IAuthenticationManagementRepo _repo;
        public AuthenticationManagementController(IAuthenticationManagementRepo repo)
        {
            _repo = repo;
        }

        [HttpPost ("Login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            try
            {
                var apiResponse = await _repo.Login(login);
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {message = ex.Message});
            }
            
        }
    }
}
