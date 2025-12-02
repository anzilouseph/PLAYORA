using Playora.Dto;
using Playora.Utility;

namespace Playora.IRepository
{
    public interface IUserManagementRepo
    {
        public Task<ApiHelper<string>> UserCreation(UserForCreationDto user);
    }
}
