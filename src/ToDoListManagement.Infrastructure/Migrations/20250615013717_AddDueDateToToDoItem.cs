using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDueDateToToDoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "ToDoItems",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "ToDoItems");
        }
    }
}
