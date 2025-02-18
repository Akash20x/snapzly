// Import handlers for authentication-related routes
import { handlers } from "@/lib/auth"; 

// Export the GET and POST methods from the imported handlers
export const { GET, POST } = handlers;