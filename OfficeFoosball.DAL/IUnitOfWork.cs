﻿namespace OfficeFoosball.DAL
{
    public interface IUnitOfWork
    {
        IPlayerRepository Players { get; }

        IMatchRepository Matches { get; }
        ITeamRepository Teams { get; }
    }
}
