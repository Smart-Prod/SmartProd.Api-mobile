import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import API from '../services/api';
import type { Product, BOM, Movimentacao, ProductionOrder, Invoice } from '../models/index';

export type { Product, BOM, Movimentacao, ProductionOrder, Invoice };

interface AppContextType {
  products: Product[];
  boms: BOM[];
  movimentacoes: Movimentacao[];
  productionOrders: ProductionOrder[];
  invoices: Invoice[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  addProductionOrder: (order: Omit<ProductionOrder, 'id' | 'createdAt' | 'finishedAt' | 'produced'>) => Promise<ProductionOrder>;
  updateProductionOrder: (id: number, order: Partial<ProductionOrder>) => Promise<void>;
  addMovimentacao: (movement: Omit<Movimentacao, 'id' | 'createdAt'>) => Promise<Movimentacao>;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'date'>) => Promise<Invoice>;
  addBOM: (bom: Omit<BOM, 'id'>) => Promise<BOM>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [boms, setBoms] = useState<BOM[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Função para buscar produtos da API
  const fetchProducts = useCallback(async () => {
    try {
      console.log('fetchProducts: Iniciando busca de produtos...');
      const res = await API.get('/api/Produto');
      console.log('fetchProducts: Resposta completa:', res);
      console.log('fetchProducts: res.data:', res.data);
      
      // A API retorna { success, message, data }
      const productsData = res.data.data || res.data;
      console.log('fetchProducts: productsData extraído:', productsData);
      console.log('fetchProducts: É array?', Array.isArray(productsData));
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      console.log('fetchProducts: Produtos definidos no estado');
    } catch (err) {
      console.error('fetchProducts: Erro ao buscar produtos:', err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      console.log('useEffect: Iniciando carregamento de dados...');

      // Busca produtos
      try {
        const productsRes = await API.get('/api/Produto');
        console.log('✅ PRODUTOS - Resposta completa:', productsRes);
        console.log('✅ PRODUTOS - productsRes.data:', productsRes.data);

        if (mounted) {
          const productsData = productsRes.data.data || productsRes.data;
          console.log('✅ PRODUTOS - productsData extraído:', productsData);
          console.log('✅ PRODUTOS - É array?', Array.isArray(productsData));
          console.log('✅ PRODUTOS - Quantidade:', Array.isArray(productsData) ? productsData.length : 0);

          setProducts(Array.isArray(productsData) ? productsData : []);
        }
      } catch (err) {
        console.error('❌ PRODUTOS - Erro:', err);
      }

      // Busca Stock Movements (silencioso em caso de erro)
      try {
        const stockRes = await API.get('/api/Movimentacao');
        if (mounted) {
          const stockData = stockRes.data.data || stockRes.data;
          setMovimentacoes(Array.isArray(stockData) ? stockData : []);
        }
      } catch (err) {
        // Silencioso - endpoint pode não existir
      }

      // Busca Production Orders (silencioso em caso de erro)
      try {
        const ordersRes = await API.get('/api/ProducaoOrdem');
        if (mounted) {
          const ordersData = ordersRes.data.data || ordersRes.data;
          setProductionOrders(Array.isArray(ordersData) ? ordersData : []);
        }
      } catch (err) {
        // Silencioso - endpoint pode não existir
      }

      // Busca Invoices (silencioso em caso de erro)
      try {
        const invoicesRes = await API.get('/api/NotaFiscal');
        if (mounted) {
          const invoicesData = invoicesRes.data.data || invoicesRes.data;
          setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
        }
      } catch (err) {
        // Silencioso - endpoint pode não existir
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const genId = () => Date.now();

  const addProduct = useCallback(async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      console.log('addProduct: Criando produto:', product);
      const res = await API.post('/api/Produto', product);
      console.log('addProduct: Resposta da criação:', res.data);
      
      // A API retorna { success, message, data }
      const newProduct = res.data.data;
      
      // Recarrega a lista completa de produtos após criar
      console.log('addProduct: Recarregando lista de produtos...');
      await fetchProducts();
      
      return newProduct;
    } catch (err: any) {
      console.error('addProduct: API failed', err.response?.data || err.message);
      throw err;
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id: number, product: Partial<Product>): Promise<void> => {
    try {
      await API.put(`/api/Produto/${id}`, product);
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...product } : p)));
    } catch (err) {
      console.warn('updateProduct: API failed, applied local update', err);
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...product } : p)));
    }
  }, []);

  const addProductionOrder = useCallback(async (
    order: Omit<ProductionOrder, 'id' | 'createdAt' | 'finishedAt' | 'produced'>
  ): Promise<ProductionOrder> => {
    const payload = { ...order, createdAt: new Date().toISOString(), produced: 0 };
    try {
      const res = await API.post<ProductionOrder>('/api/ProducaoOrdem', payload);
      setProductionOrders(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.warn('addProductionOrder: API failed, using local fallback', err);
      const newOrder: ProductionOrder = { ...payload, id: genId() };
      setProductionOrders(prev => [...prev, newOrder]);
      return newOrder;
    }
  }, []);

  const updateProductionOrder = useCallback(async (id: number, order: Partial<ProductionOrder>): Promise<void> => {
    try {
      await API.put(`/api/ProducaoOrdem/${id}`, order);
      setProductionOrders(prev => prev.map(o => (o.id === id ? { ...o, ...order } : o)));
    } catch (err) {
      console.warn('updateProductionOrder: API failed, applied local update', err);
      setProductionOrders(prev => prev.map(o => (o.id === id ? { ...o, ...order } : o)));
    }
  }, []);

  const addStockMovement = useCallback(async (movement: Omit<Movimentacao, 'id' | 'createdAt'>): Promise<Movimentacao> => {
    const payload = { ...movement, createdAt: new Date().toISOString() };
    try {
      const res = await API.post<Movimentacao>('/api/Movimentacao', payload);
      setMovimentacoes(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.warn('addMovimentacao: API failed, using local fallback', err);
      const newMovement: Movimentacao = { ...payload, id: genId() };
      setMovimentacoes(prev => [newMovement, ...prev]);
      return newMovement;
    }
  }, []);

  const addInvoice = useCallback(async (invoice: Omit<Invoice, 'id' | 'date'>): Promise<Invoice> => {
    const payload = { ...invoice, date: new Date().toISOString() };
    try {
      const res = await API.post<Invoice>('/api/NotaFiscal', payload);
      setInvoices(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.warn('addInvoice: API failed, using local fallback', err);
      const newInvoice: Invoice = { ...payload, id: genId() };
      setInvoices(prev => [newInvoice, ...prev]);
      return newInvoice;
    }
  }, []);

  const addBOM = useCallback(async (bom: Omit<BOM, 'id'>): Promise<BOM> => {
    try {
      const res = await API.post<BOM>('/api/BOM', bom);
      setBoms(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.warn('addBOM: API failed, using local fallback', err);
      const newBOM: BOM = { ...bom, id: genId() };
      setBoms(prev => [...prev, newBOM]);
      return newBOM;
    }
  }, []);

  const value = useMemo(() => ({
    products,
    boms,
    movimentacoes,
    productionOrders,
    invoices,
    addProduct,
    updateProduct,
    addProductionOrder,
    updateProductionOrder,
    addMovimentacao: addStockMovement,
    addInvoice,
    addBOM,
  }), [
    products,
    boms,
    movimentacoes,
    productionOrders,
    invoices,
    addProduct,
    updateProduct,
    addProductionOrder,
    updateProductionOrder,
    addStockMovement,
    addInvoice,
    addBOM,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
