import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, recaptchaToken } = await req.json();

    // 1. VALIDACIÓN ESTRICTA DE EMAIL (Formato HTML5 y límite de longitud)
    const emailRegex = /^[a-zA-Z0-9._\-\+]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== 'string' || email.length > 255 || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido o formato incorrecto.' },
        { status: 400 }
      );
    }

    // 2. VERIFICACIÓN DE RECAPTCHA CONTRA LOS SERVIDORES DE GOOGLE
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'Falta la verificación de seguridad (reCAPTCHA).' },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("ERROR CRÍTICO: RECAPTCHA_SECRET_KEY no está configurada en las variables de entorno.");
      return NextResponse.json(
        { success: false, message: 'Error de configuración del servidor. Contacte al administrador.' },
        { status: 500 }
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error("Fallo de reCAPTCHA:", recaptchaData);
      return NextResponse.json(
        { success: false, message: 'No pudimos verificar que eres humano. Intenta de nuevo.' },
        { status: 403 }
      );
    }

    // 3. CONEXIÓN A BASE DE DATOS Y GUARDADO
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO solicitudes_acceso (email, correo_enviado, fecha_solicitud) VALUES (?, 0, NOW())',
        [email]
      );
      
      return NextResponse.json({ success: true, message: '¡Te has unido a la lista de espera exitosamente!' });
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ success: true, message: 'Ya estabas registrado en la lista de espera.' });
      }
      console.error('Error insertando en la BD:', error);
      return NextResponse.json(
        { success: false, message: 'Ocurrió un error al procesar tu solicitud.' },
        { status: 500 }
      );
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error procesando request:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
