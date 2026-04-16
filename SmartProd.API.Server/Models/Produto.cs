namespace SmartProd.API.Server.Models
{
    public class Produto
    {
        public string? Id { get; set; }
        public string? Nome { get; set; }
        public string? Codigo { get; set; }
        public int Quantidade { get; set; }
        public int EstoqueMionimo { get; set; }
        
    }
}
