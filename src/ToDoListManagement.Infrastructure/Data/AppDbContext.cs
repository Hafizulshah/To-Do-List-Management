using Microsoft.EntityFrameworkCore;
using ToDoListManagement.Core.Entities;

namespace ToDoListManagement.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<ToDoItem> ToDoItems => Set<ToDoItem>();

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Optional: You can configure entities here
    }
}