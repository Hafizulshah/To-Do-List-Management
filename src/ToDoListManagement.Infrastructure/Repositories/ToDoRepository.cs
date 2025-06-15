using Microsoft.EntityFrameworkCore;
using ToDoListManagement.Core.Entities;
using ToDoListManagement.Core.Interfaces;
using ToDoListManagement.Infrastructure.Data;

namespace ToDoListManagement.Infrastructure.Repositories;

public class ToDoRepository : IToDoRepository
{
    private readonly AppDbContext _context;

    public ToDoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ToDoItem>> GetAllAsync()
    {
        return await _context.ToDoItems.ToListAsync();
    }

    public async Task<ToDoItem?> GetByIdAsync(Guid id)
    {
        return await _context.ToDoItems.FindAsync(id);
    }

    public async Task AddAsync(ToDoItem item)
    {
        _context.ToDoItems.Add(item);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ToDoItem item)
    {
        var existing = await _context.ToDoItems.FindAsync(item.Id);
        if (existing == null) return;

        // Update only the necessary fields
        existing.Title = item.Title;
        existing.Description = item.Description;
        existing.DueDate = item.DueDate;
        existing.IsCompleted = item.IsCompleted;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await _context.ToDoItems.FindAsync(id);
        if (item is not null)
        {
            _context.ToDoItems.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}