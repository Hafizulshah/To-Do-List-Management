namespace ToDoListManagement.Core.Entities;

using System.ComponentModel.DataAnnotations;

public class ToDoItem
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Title must be at least 3 characters long.")]
    public string Title { get; set; } = string.Empty;

    [StringLength(200)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? DueDate { get; set; }

    public bool IsCompleted { get; set; } = false;
}