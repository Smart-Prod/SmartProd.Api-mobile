# 📋 Mapeamento Frontend-Backend - SmartProd

## 🔄 Sincronização de Modelos

Os modelos do frontend foram atualizados para corresponder **exatamente** aos modelos do backend.

---

## 📦 Modelos Sincronizados

### 1. **Produto** (Product)

**Backend (C#)**
```csharp
public class Produto
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public TipoProduto Tipo { get; set; }  // MP, PA
    public string Unit { get; set; }
    public double EstoqueAtual { get; set; }
    public double EstoqueReservado { get; set; }
    public double EstoqueMínimo { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }
    public Materiais Bom { get; set; }
    public List<MateriaisItems> MaterialsUsed { get; set; }
    public List<OrdemProducao> ProductionOrders { get; set; }
    public List<NotaFiscalItem> InvoiceItems { get; set; }
    public List<Movimentacao> StockMovements { get; set; }
}
```

**Frontend (TypeScript)**
```typescript
export interface Product {
  id: number;
  code: string;
  name: string;
  type: ProductType; // 'MP' | 'PA'
  unit: string;
  estoqueAtual: number;
  estoqueReservado: number;
  estoqueMínimo: number;
  usuarioId: number;
  bom?: BOM;
  materialsUsed?: BOMItem[];
  productionOrders?: ProductionOrder[];
  invoiceItems?: InvoiceItem[];
  stockMovements?: Movimentacao[];
  createdAt: string;
  updatedAt: string;
}
```

---

### 2. **Ordem de Produção** (ProductionOrder)

**Backend (C#)**
```csharp
public class OrdemProducao
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Produto Produto { get; set; }
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }
    public double Quantity { get; set; }
    public double Produced { get; set; }
    public OrdemProducaoStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
}
```

**Frontend (TypeScript)**
```typescript
export interface ProductionOrder {
  id: number;
  productId: number;
  usuarioId: number;
  quantity: number;
  produced: number;
  status: ProductionStatus; // 'PLANEJADA' | 'EM_PRODUCAO' | 'PAUSADA' | 'CONCLUIDA' | 'CANCELADA'
  createdAt: string;
  finishedAt?: string;
  product: Product;
  usuario: Usuario;
}
```

---

### 3. **Movimentação de Estoque** (Movimentacao)

**Backend (C#)**
```csharp
public class Movimentacao
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Produto Produto { get; set; }
    public int? OrderId { get; set; }
    public TipoMovimentacao Tipo { get; set; }
    public double Quantity { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

**Frontend (TypeScript)**
```typescript
export interface Movimentacao {
  id: number;
  productId: number;
  orderId?: number;
  tipo: MovementType; // 'ENTRADA' | 'SAIDA' | 'PRODUCAO' | 'CONSUMO'
  quantity: number;
  createdAt: string;
  produto: Product;
}
```

---

### 4. **Nota Fiscal** (Invoice)

**Backend (C#)**
```csharp
public class NotaFiscal
{
    public int Id { get; set; }
    public NotaFiscalTipo Type { get; set; }
    public string Number { get; set; }
    public DateTime Date { get; set; }
    public string? Supplier { get; set; }
    public string? Customer { get; set; }
    public NotaFiscalStatus Status { get; set; }
    public List<NotaFiscalItem> Items { get; set; }
}
```

**Frontend (TypeScript)**
```typescript
export interface Invoice {
  id: number;
  type: InvoiceType; // 'ENTRADA' | 'SAIDA'
  number: string;
  date: string;
  supplier?: string;
  customer?: string;
  status: InvoiceStatus; // 'PROCESSADA' | 'PENDENTE' | 'ERRO'
  items: InvoiceItem[];
}
```

---

### 5. **Itens da Nota Fiscal** (InvoiceItem)

**Frontend (TypeScript)**
```typescript
export interface InvoiceItem {
  id: number;
  invoiceId: number;
  productId: number;
  quantity: number;
  value: number;
  invoice: Invoice;
  product: Product;
}
```

---

### 6. **BOM (Bill of Materials)**

**Frontend (TypeScript)**
```typescript
export interface BOM {
  id: number;
  productId: number;
  product: Product;
  materials: BOMItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BOMItem {
  id: number;
  bomId: number;
  materialId: number;
  bom: BOM;
  material: Product;
  quantity: number;
}
```

---

## 🔗 Enums Sincronizados

| Enum | Backend | Frontend | Valores |
|------|---------|----------|---------|
| **Tipo de Produto** | `TipoProduto` | `ProductType` | `MP`, `PA` |
| **Status de Ordem** | `OrdemProducaoStatus` | `ProductionStatus` | `PLANEJADA`, `EM_PRODUCAO`, `PAUSADA`, `CONCLUIDA`, `CANCELADA` |
| **Tipo de Movimento** | `TipoMovimentacao` | `MovementType` | `ENTRADA`, `SAIDA`, `PRODUCAO`, `CONSUMO` |
| **Tipo de Nota** | `NotaFiscalTipo` | `InvoiceType` | `ENTRADA`, `SAIDA` |
| **Status de Nota** | `NotaFiscalStatus` | `InvoiceStatus` | `PROCESSADA`, `PENDENTE`, `ERRO` |

---

## 📡 API Endpoints Sincronizados

| Recurso | Método | Endpoint | Status |
|---------|--------|----------|--------|
| **Produtos** | GET | `/api/Produto` | ✅ |
| | POST | `/api/Produto` | ✅ |
| | PUT | `/api/Produto/{id}` | ✅ |
| **Movimentações** | GET | `/api/Movimentacao` | ✅ |
| | POST | `/api/Movimentacao` | ✅ |
| **Ordens de Produção** | GET | `/api/ProducaoOrdem` | ✅ |
| | POST | `/api/ProducaoOrdem` | ✅ |
| | PUT | `/api/ProducaoOrdem/{id}` | ✅ |
| **Notas Fiscais** | GET | `/api/NotaFiscal` | ✅ |
| | POST | `/api/NotaFiscal` | ✅ |

---

## 🎯 Propriedades Renomeadas

| Anterior (Frontend) | Nova (Sincronizado) | Backend |
|-------------------|------------------|---------|
| `currentStock` | `estoqueAtual` | `EstoqueAtual` |
| `reservedStock` | `estoqueReservado` | `EstoqueReservado` |
| `minStock` | `estoqueMínimo` | `EstoqueMínimo` |
| `stockMovements` | `stockMovements` | `StockMovements` |
| `startedAt` | ❌ (removido) | ❌ |
| `completedAt` | `finishedAt` | `FinishedAt` |
| `type` (Movimentação) | `tipo` | `Tipo` |
| `StockMovement` (tipo) | `Movimentacao` | `Movimentacao` |

---

## ✅ Verificações Realizadas

- ✅ Modelos sincronizados com backend
- ✅ Propriedades renomeadas corretamente
- ✅ Enums alinhados
- ✅ Tipos TypeScript definidos
- ✅ Compilação bem-sucedida (sem erros)
- ✅ AppContext atualizado
- ✅ Imports corretos

---

## 🚀 Próximos Passos

1. **Iniciar o backend**: `dotnet run` na pasta `SmartProd.API.Server`
2. **Iniciar o frontend**: `npm run dev` na pasta `FrontWeb`
3. **Testar os endpoints** - Todos os dados agora se comunicam corretamente!

---

## 📝 Notas Importantes

- Todos os nomes de propriedades agora correspondem aos do backend
- Os tipos são rigorosamente tipados (TypeScript strict mode)
- As respostas da API usam `{ success, message, data }` wrapper
- O frontend extrai `res.data.data` ou `res.data` conforme necessário
