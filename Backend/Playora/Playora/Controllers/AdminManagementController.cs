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

        public AdminManagementController(IAdminManagementRepository repo)
        {
            _repo = repo;
        }

        [Authorize]
        [HttpGet ("get-all-user")]
        public async Task<IActionResult> GetAllUsersByAdmin()
    }
}
