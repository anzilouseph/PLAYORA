
using Microsoft.EntityFrameworkCore;
using Playora.Entity;


namespace Playora.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserMaster> Users { get; set; }

        public DbSet<UserLevel> Levels { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Login> Logins { get; set; }
            
        protected  override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserMaster>(entity => entity.HasKey(entity => entity.UserId));
            modelBuilder.Entity<UserLevel>(entity=>entity.HasKey(e=>e.UserLevelId));
            modelBuilder.Entity<Role>(entity=>entity.HasKey(e=>e.RoleId));
            modelBuilder.Entity<Login>(entity => entity.HasKey(e => e.LoginId));





        }

    }
}
