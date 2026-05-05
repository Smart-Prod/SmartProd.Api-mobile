namespace SmartProd.API.Server.Models
{
    /// <summary>
    /// Stock Movement Model
    /// Representa uma movimentação de estoque no sistema
    /// </summary>
    public class Movimentacao
    {
        public string Id { get; set; }
        public string ProductId { get; set; }
        public MovementType Type { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public string? OrderId { get; set; }
        public string? Notes { get; set; }
    }
}
