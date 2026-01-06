using Playora.Dto;
using Playora.Utility;

namespace Playora.IRepository
{
    public interface IAdminManagementRepository
    {
        public Task<ApiHelper<List<UserForListDto>>> GetAllUserByAdmin();
        public Task<ApiHelper<UserForListDto>> GetUserByAdmin(long id);
        public Task<ApiHelper<UserForUpdateDto>> UpdateUserByIdByAdmin(UserForUpdateDto user, long id);

    }
}
