﻿using Microsoft.Extensions.DependencyInjection;
using OfficeFoosball.DAL;

namespace OfficeFoosball.Fakes
{
    public static class DataStoreRegistrator
    {
        public static IServiceCollection RegisterFake(IServiceCollection services)
        {
            services.AddSingleton<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IDataStoreInitializer, DataStoreInitializer>();
            return services;
        }
    }
}
