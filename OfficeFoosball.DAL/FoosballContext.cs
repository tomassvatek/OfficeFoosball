﻿using Microsoft.EntityFrameworkCore;
using OfficeFoosball.DAL.Entities;

namespace OfficeFoosball.DAL
{
    public class FoosballContext : DbContext
    {
        public FoosballContext(DbContextOptions options) : base(options)
        {
                
        }
        
        public DbSet<Match> Matches { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Player>()
                .Property(p => p.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Team>()
                .Property(p => p.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Match>()
                .Property(p => p.Id)
                .ValueGeneratedNever();
        }
    }
}
