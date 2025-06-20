using Microsoft.AspNetCore.Mvc;
using ToDoListManagement.Core.Entities;
using ToDoListManagement.Core.Interfaces;

namespace ToDoListManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToDoController : ControllerBase
{
    private readonly IToDoRepository _repository;

    public ToDoController(IToDoRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAll()
    {
        var items = await _repository.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ToDoItem>> GetById(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] ToDoItem item)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _repository.AddAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] ToDoItem item)
    {
        if (id != item.Id)
            return BadRequest("Mismatched ID");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
            return NotFound();

        await _repository.UpdateAsync(item);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}