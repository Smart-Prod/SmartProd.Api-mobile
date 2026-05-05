namespace SmartProd.API.Server.Models
{
    public class Usuarios
    {
        /// <summary>
        /// Identificador único do usuário
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Nome de usuário para login (único)
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Nome completo do usuário
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Email do usuário (único)
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Papel/permissão do usuário no sistema
        /// </summary>
        public UserRole Role { get; set; }

        /// <summary>
        /// Status ativo/inativo do usuário
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Data de criação do cadastro
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Departamento ou setor (opcional)
        /// </summary>
        public string? Department { get; set; }
    }
    public static class UserRoleExtensions
    {
        /// <summary>
        /// Retorna o label do papel do usuário em português
        /// </summary>
        public static string GetUserRoleLabel(this UserRole role)
        {
            return role switch
            {
                UserRole.Admin => "Administrador",
                UserRole.Operator => "Operador",                
                _ => throw new ArgumentOutOfRangeException(nameof(role), role, null)
            };
        }

        /// <summary>
        /// Retorna a descrição do papel do usuário
        /// </summary>
        public static string GetUserRoleDescription(this UserRole role)
        {
            return role switch
            {
                UserRole.Admin => "Acesso total ao sistema, gerencia usuários e configurações",
                UserRole.Operator => "Registra movimentações, ordens de produção e notas fiscais",                
                _ => throw new ArgumentOutOfRangeException(nameof(role), role, null)
            };
        }
    }
}
