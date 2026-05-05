namespace SmartProd.API.Server.internal enum
{
    /// <summary>
    /// Represents the possible statuses of a production order
    /// </summary>
    public enum OrdemProducaoStatus
{
        planejada,
        em_producao,
        pausada,
        concluida,
        cancelada
    }
}
