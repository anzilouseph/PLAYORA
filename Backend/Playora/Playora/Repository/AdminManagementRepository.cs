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
                                userLevelName = uulRes.Name,
                            });
                var list = await data.ToListAsync();
                return ApiHelper<List<UserForListDto>>.Success(list, "success");
            }
            catch (Exception ex)
            {
                return ApiHelper<List<UserForListDto>>.Error("Error"); 

            }
        }
    }
}
