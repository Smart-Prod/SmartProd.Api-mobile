using Microsoft.EntityFrameworkCore;
using SmartProd.API.Server.Data;
using SmartProd.API.Server.DTOs;
using SmartProd.API.Server.Enum;
using SmartProd.API.Server.Models;

namespace SmartProd.API.Server.Serveces
{
    public class ProductionOrderService
    {
        private readonly AppDbContext _context;
        public ProductionOrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> CreateOrderAsync(OrdemProducaoCreateDto data)
        {
            // Verifica se o produto existe
            var product = await _context.Produtos.FindAsync(data.ProductId);
            if (product == null)
                throw new System.Exception("Produto não encontrado.");

            // 1 — Cria a ordem de produção
            var order = new OrdemProducao
            {
                ProductId = data.ProductId,
                UsuarioId = data.UsuarioId,
                Quantity = data.Quantity,
                Status = OrdemProducaoStatus.PLANEJADA,
                Produced = 0,
                CreatedAt = System.DateTime.Now
            };

            _context.OrdensProducao.Add(order);
            await _context.SaveChangesAsync();

            // 2 — Busca a BOM (receita) do produto
            var bom = await _context.Materiais
                .Include(b => b.Materials)
                    .ThenInclude(bm => bm.Produtos)
                .FirstOrDefaultAsync(b => b.ProdutoId == data.ProductId);

            if (bom == null)
            {
                return new
                {
                    order,
                    materialsNeeded = new List<object>()
                };
            }

            // 3 — Calcula o consumo de materiais
            var materialsNeeded = bom.Materials.Select(item => new
            {
                materialId = item.MaterialId,
                materialName = item.Produtos?.Name ?? "Desconhecido",
                quantityPerUnit = item.Quantidade,
                totalQuantity = item.Quantidade * data.Quantity
            }).ToList();

            return new
            {
                order,
                materialsNeeded
            };
        }

        public async Task<List<OrdemProducao>> GetAllOrdersAsync()
        {
            return await _context.OrdensProducao
                .Include(o => o.Produto)
                .Include(o => o.Usuario)
                .ToListAsync();
        }
    }
}
