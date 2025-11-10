// middleware.js o middleware.ts
import { withAuth } from "next-auth/middleware"

// La URL a la que se redirigirá si el usuario no está autenticado
const LOGIN_PAGE = "/auth/login";

export default withAuth(
  // Función de callback donde puedes añadir lógica personalizada
  async function middleware(req) {
    // Si la ruta actual no es la que queremos evitar (ej: /auth/login),
    // y no está logueado, withAuth ya se encarga de redirigir a la página de login
    // definida en el callback.
    return null; // Deja que withAuth haga la magia
  },
  {
    callbacks: {
      // Esta función se ejecuta para verificar si el usuario tiene permiso
      authorized: ({ token }) => !!token, // Devuelve true si hay un token (usuario logueado)
    },
    // Definimos las páginas a las que redirigir si la autorización falla
    pages: {
      signIn: LOGIN_PAGE, // Redirige aquí si no está autorizado
    },
  }
)

export const config = {
  // Las rutas que queremos proteger.
  // Aquí se protegerá TODO excepto /auth/login, /api/auth, y _next/static, etc.
  // Es una forma de decir: protege *todas* las rutas.
  // NextAuth es inteligente y sabe no proteger /api/auth y las estáticas.
  matcher: [
    /*
     * Protege todas las rutas excepto:
     * - /api/auth (rutas de autenticación)
     * - /_next/static (archivos estáticos)
     * - /_next/image (optimización de imágenes)
     * - /favicon.ico (el favicon)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    // Si necesitas excluir la página de inicio específica:
    // '/((?!api/auth|_next/static|_next/image|favicon.ico|auth/login|/)$)',
  ],
}