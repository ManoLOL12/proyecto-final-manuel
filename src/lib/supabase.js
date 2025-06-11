import { createClient } from '@supabase/supabase-js'

// Obtenemos las variables para configurar supabase de variables de entorno definidas

// en el fichero .env (raíz del proyecto)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// creamos el cliente de supabase con la configuración de mi proyecto

export const supabase = createClient(supabaseUrl, supabaseKey)