using Microsoft.EntityFrameworkCore;
using SmartProd.API.Server.Data;
using SmartProd.API.Server.DTOs;
using SmartProd.API.Server.Models;

namespace SmartProd.API.Server.Serveces
{
    public class ProdutoService
    {
        private readonly AppDbContext _context; // Seu DbContext

        public ProdutoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Produto> CreateProductAsync(ProdutoCreateDto dto, int usuarioId)
        {
            // Verifica duplicidade
            if (await _context.Produtos.AnyAsync(p => p.Code == dto.Code))
                throw new Exception("Código de produto já está em uso.");

            var produto = new Produto
            {
                Code = dto.Code,
                Name = dto.Name,
                Tipo = dto.Tipo,
                Unit = dto.Unit,
                EstoqueAtual = dto.EstoqueAtual,
                EstoqueReservado = dto.EstoqueReservado,
                EstoqueMínimo = dto.EstoqueMínimo,
                UsuarioId = usuarioId
                // Bom, CreatedAt, etc. se necessário
            };

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<List<Produto>> GetAllProductsAsync()
        {
            return await _context.Produtos
                .Include(p => p.Bom)
                .ToListAsync();
        }

        public async Task<Produto> GetProductByIdAsync(int id)
        {
            var produto = await _context.Produtos
                .Include(p => p.Bom)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (produto == null)
                throw new Exception("Produto não encontrado.");
            return produto;
        }
    }
}
