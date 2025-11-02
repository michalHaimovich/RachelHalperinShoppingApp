using Microsoft.EntityFrameworkCore;
using ShoppingApp.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ShoppingApp.Data
{
    public class ShoppingDbContext : DbContext
    {
        public ShoppingDbContext(DbContextOptions<ShoppingDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Groceries" },
                new Category { Id = 2, Name = "Dairy" },
                new Category { Id = 3, Name = "Bakery" },
                new Category { Id = 4, Name = "Meat" },
                new Category { Id = 5, Name = "Produce" },
                new Category { Id = 6, Name = "Household" },
                new Category { Id = 7, Name = "Electronics" },
                new Category (Id =10,Name ="bla bla")
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
