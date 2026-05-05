namespace SmartProd.API.Server.internal enum
{
    public class NotaFscal
    {
        public string Id { get; set; }
        public InvoiceType Type { get; set; }
        public string Number { get; set; }
        public DateTime Date { get; set; }
        public string Supplier { get; set; }
        public string Customer { get; set; }
        public List<InvoiceItem> Items { get; set; }
        public InvoiceStatus Status { get; set; }
    }
}

