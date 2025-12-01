using Playora.Utility;
using Microsoft.EntityFrameworkCore;
using Playora.Context;
using Playora.Dto;
using Playora.IRepository;


namespace Playora.Repository
{
    public class AuthenticationManagementRepo : IAuthenticationManagementRepo
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthenticationManagementRepo(AppDbContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ApiHelper<string>> Login (LoginDto login)
        {
            var existingData = await _context.Logins.Where(x => x.Email.ToLower() == login.Email.ToLower() && !x.IsDelete).FirstOrDefaultAsync();
            if(existingData == null)
            {
                return ApiHelper<string>.Error("Invalid Email");
            }

            var passwordVerfication = Utility.PasswordHashHelper.VerifyPassword(login.Password, existingData.Password, existingData.Salt);

            if(!passwordVerfication)
            {
                return ApiHelper<string>.Error("Password dont match");
            }

            var tokenGenerate = new GenerateJWT(_configuration);

            var accessToken = tokenGenerate.GenerateToken(existingData);

            if(accessToken == null)
            {
                return ApiHelper<string>.Error("Unable to Generate Jwt");
            }


            return ApiHelper<string>.Success(accessToken,"Success");


        }
    }
}
