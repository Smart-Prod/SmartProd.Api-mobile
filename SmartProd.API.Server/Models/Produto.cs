namespace SmartProd.API.Server.Models
{
    public class Produto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public ProductType Type { get; set; } // Matéria Prima ou Produto Acabado
        public string Unit { get; set; }
        public double CurrentStock { get; set; }
        public double ReservedStock { get; set; }
        public double MinStock { get; set; }
        public string? BomId { get; set; } // Bill of Materials for finished products
    }

}
}
