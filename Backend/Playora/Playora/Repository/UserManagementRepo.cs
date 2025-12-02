    using Playora.Context;
    using Playora.Dto;
    using Playora.IRepository;
    using Playora.Utility;
    using Playora.Entity;
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;

    namespace Playora.Repository
    {
        public class UserManagementRepo : IUserManagementRepo
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            public UserManagementRepo(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            //for user creation
            public async Task<ApiHelper<string>> UserCreation(UserForCreationDto user)
            {
            
                    var hashedPassword = Utility.PasswordHashHelper.HashPassword(user.Password,out var salt);
            
                await _context.CreateTransactionAsync();

                var userDetails = new UserMaster();
                userDetails = _mapper.Map<UserMaster>(user);
                try
                {
                    await _context.Users.AddAsync(userDetails);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                        return ApiHelper<string>.Error(ex.Message);
                }

                // the beauty of ef is taht we dont need to store the data into the db(to get the userId cuz user id  is auto increment in db )
                //here after save changes async the object "userDetails" will beautomattically updatedand the "UserId" will be 1(first raw to te table)
                var loginCredentials = new Login()
                {
                    UserId = userDetails.UserId,
                    Email = userDetails.Email,
                    Password = hashedPassword,
                    Salt = salt,
                };
                try
                {
                    await _context.Logins.AddAsync(loginCredentials);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return ApiHelper<string>.Error(ex.Message);
                }
                await _context.CommitTransactionAsync();
                return ApiHelper<string>.Success(null, "User Created SuccessFully");
            }
        }
    }
