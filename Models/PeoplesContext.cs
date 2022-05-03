using Microsoft.EntityFrameworkCore;
namespace LABAPP3.Models
{
    public class PeoplesContext : DbContext
    {
        public DbSet<People> People { get; set; }

        public PeoplesContext(DbContextOptions<PeoplesContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
