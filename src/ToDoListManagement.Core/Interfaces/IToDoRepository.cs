using ToDoListManagement.Core.Entities;

namespace ToDoListManagement.Core.Interfaces;

public interface IToDoRepository
{
    Task<List<ToDoItem>> GetAllAsync();
    Task<ToDoItem?> GetByIdAsync(Guid id);
    Task AddAsync(ToDoItem item);
    Task UpdateAsync(ToDoItem item);
    Task DeleteAsync(Guid id);
}