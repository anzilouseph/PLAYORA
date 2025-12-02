
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql.Replication.PgOutput.Messages;
using Playora.Entity;


namespace Playora.Context
{
    public class AppDbContext : DbContext
    {
        private IDbContextTransaction _transaction;
        public AppDbContext(IDbContextTransaction transaction)
        {
            _transaction = transaction;
        }
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

        public async Task CreateTransactionAsync()
        {
            if (_transaction != null)
            {
                return;
            }

            _transaction = await Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            try
            {
                await _transaction.CommitAsync();
            } 
            catch {
                await RollbackTransactionAsync();
                throw;
            }
            finally
            {
                if (_transaction != null)
                {
                    await _transaction.DisposeAsync();
                    _transaction = null;
                }
            }

        }

        public async Task RollbackTransactionAsync()
        {
            try
            {
                await _transaction?.RollbackAsync();
            }
            finally
            {
                if (_transaction != null)
                {
                    await _transaction.DisposeAsync();
                    _transaction = null;
                }
            }
        }
        public bool HasActiveTransaction => _transaction != null;


    }
}
