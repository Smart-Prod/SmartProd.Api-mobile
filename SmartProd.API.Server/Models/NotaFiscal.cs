using SmartProd.API.Server.Enum;

namespace SmartProd.API.Server.Models
{
    public class NotaFiscal
    {
        public string? Id { get; set; }
        public NotaFiscalTipo Type { get; set; }
        public string? Number { get; set; }
        public DateTime Date { get; set; }
        public string? Supplier { get; set; }
        public string? Customer { get; set; }
        public List<NotaFiscalItem>? Items { get; set; }
        public NotaFiscalStatus Status { get; set; }
    }
}

