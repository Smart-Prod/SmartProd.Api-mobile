var builder = DistributedApplication.CreateBuilder(args);

// Adiciona apenas o seu projeto de Back-end (Server)
var server = builder.AddProject<Projects.SmartProd_API_Server>("server")
    .WithExternalHttpEndpoints();

builder.Build().Run();
