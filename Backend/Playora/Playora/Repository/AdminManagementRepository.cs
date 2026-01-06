using Microsoft.EntityFrameworkCore;
using Playora.Context;
using Playora.Dto;
using Playora.Entity;
using Playora.IRepository;
using Playora.Utility;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Playora.Repository
{
    public class AdminManagementRepository : IAdminManagementRepository
    {
        public readonly AppDbContext _context;
        public AdminManagementRepository(AppDbContext context)
        {
            _context = context;
        }

        //for get alll users
        public async Task<ApiHelper<List<UserForListDto>>>GetAllUserByAdmin()
        {
            var users = _context.Users.Where(x => !x.IsDelete); 

            var userLevels = _context.Levels.Where(x => !x.IsDelete);

            try
            {
                var data = (from u in users

                            join ul in userLevels
                            on u.UserLevelId equals ul.UserLevelId
                            into uul
                            from uulRes in uul.DefaultIfEmpty()
                            where !u.IsDelete
                            select new UserForListDto
                            {
                                nameOfUser = u.UserName,
                                mobileOfUser = u.Email,
                                ageOfUser = u.Age,
                                emailOfUser = u.Email,
                                profileOfUser = u.ProfileUrl,
                                UserLevelId = u.UserLevelId,
                                userLevelName = uulRes.Name??"",
                            });
                var list = await data.ToListAsync();
                return ApiHelper<List<UserForListDto>>.Success(list, "success");
            }
            catch (Exception ex)
            {
                return ApiHelper<List<UserForListDto>>.Error("Error"); 

            }
        }

        public async Task<ApiHelper<UserForListDto>> GetUserByAdmin(long id)
        {
            if(id<=0)
            {
                return ApiHelper<UserForListDto>.Error("Invalid Request");
            }

            var userData = await _context.Users.Where(x=>!x.IsDelete && x.UserId==id).FirstOrDefaultAsync();
            if(userData==null)
            {
                return ApiHelper<UserForListDto>.Error("No User");
            }
            var userLevelname = await _context.Levels.Where(x=>!x.IsDelete && x.UserLevelId==userData.UserLevelId).Select(x=>x.Name).FirstOrDefaultAsync();

            var mappped = new UserForListDto()
            {
                nameOfUser = userData.UserName,
                mobileOfUser = userData.Email,
                ageOfUser = userData.Age,
                emailOfUser = userData.Email,
                profileOfUser = userData.ProfileUrl,
                UserLevelId = userData.UserLevelId,
                userLevelName = userLevelname ?? "",
            };

            return ApiHelper<UserForListDto>.Success(mappped, "Success");
        }


        //for update user
        public async Task<ApiHelper<UserForUpdateDto>> UpdateUserByIdByAdmin(UserForUpdateDto user, long id)
        {
            if(id<=0)
            {
                return ApiHelper<UserForUpdateDto>.Error("Invalid Id");
            }
            var exxistingData = _context.Users.Where(x => !x.IsDelete && x.UserId == id);
            var mapped = _mapper.Map<>
        }


    }
}
