﻿namespace OfficeFoosball.Models.Statistics
{
    public class TeamSuccessRate
    {
        public Team Team { get; set; }
        public double SuccessPercentage { get; set; }
        public int TotalMatchCount { get; set; }
    }
}
