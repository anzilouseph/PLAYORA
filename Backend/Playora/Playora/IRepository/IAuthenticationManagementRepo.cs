using Playora.Dto;
using Playora.Utility;

namespace Playora.IRepository
{
    public interface IAuthenticationManagementRepo
    {
        public Task<ApiHelper<string>> Login(LoginDto login);
    }
}
