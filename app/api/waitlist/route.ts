import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, recaptchaToken } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Aquí podrías agregar validación adicional del recaptchaToken haciendo una petición a Google
    // si lo deseas en el futuro.

    // Conectar y ejecutar inserción
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO solicitudes_acceso (email, correo_enviado, fecha_solicitud) VALUES (?, 0, NOW())',
        [email]
      );
      
      return NextResponse.json({ success: true, message: '¡Te has unido a la lista de espera exitosamente!' });
    } catch (error: any) {
      // Código de error 1062 es Entrada Duplicada (Duplicate entry) en MySQL
      if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ success: true, message: 'Ya estabas registrado en la lista de espera.' });
      }
      console.error('Error insertando en la BD:', error);
      return NextResponse.json(
        { success: false, message: 'Ocurrió un error al procesar tu solicitud.' },
        { status: 500 }
      );
    } finally {
      connection.release(); // Siempre liberar la conexión
    }

  } catch (error) {
    console.error('Error procesando request:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
