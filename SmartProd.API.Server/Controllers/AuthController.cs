using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SmartProd.API.Server.Models;

namespace SmartProd.API.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Aqui você faria a checagem real do usuário, por exemplo, no banco de dados.
            if (request.Username == "admin" && request.Password == "1234")
            {
                return Ok(new UserResponse { Id = 1, Username = "admin", Token = "token_exemplo" });
            }
            return Unauthorized();
        }
    }
}
