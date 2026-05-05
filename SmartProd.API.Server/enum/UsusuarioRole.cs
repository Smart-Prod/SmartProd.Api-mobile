namespace SmartProd.API.Server.internal enum
{
    /// <summary>
    /// Papéis disponíveis:
    /// - admin: Acesso total ao sistema, pode gerenciar usuários e configurações
    /// - operator: Pode registrar movimentações, ordens de produção e notas fiscais
    
    /// </summary>
    public enum UsusuarioRole
    {
        Admin,
        Operator
    }
}
