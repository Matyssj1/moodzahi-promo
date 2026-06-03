<?php
// php-backend/cron_enviar_correos.php
// Este script lee la DB y usa PHPMailer para enviar los correos pendientes

require 'vendor/autoload.php'; // Asegúrate de tener instalado PHPMailer vía Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuración de la Base de Datos
$host = '172.16.81.28';
$dbname = 'moodzahi';
$user = 'root';
$pass = 'Chironte5526_';

// --- CONFIGURACIÓN DE TU SERVIDOR SMTP ---
// Reemplaza esto con los datos de tu proveedor de correos (ej. Hostinger, SendGrid, Gmail, etc)
$smtpHost = 'smtp.tudominio.com';
$smtpUser = 'hola@tudominio.com';
$smtpPass = 'TU_CONTRASEÑA';
$smtpPort = 465; // o 587 dependiendo de tu proveedor

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener hasta 50 correos no enviados por ejecución para no saturar el servidor SMTP
    $stmt = $pdo->query("SELECT solicitud_id, email FROM solicitudes_acceso WHERE correo_enviado = 0 LIMIT 50");
    $pendientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($pendientes) === 0) {
        echo "No hay correos pendientes por enviar.\n";
        exit();
    }
    
    foreach ($pendientes as $row) {
        $mail = new PHPMailer(true);
        try {
            // Configuración del Servidor SMTP
            $mail->isSMTP();
            $mail->Host       = $smtpHost;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtpUser;
            $mail->Password   = $smtpPass;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // O ENCRYPTION_STARTTLS si usas puerto 587
            $mail->Port       = $smtpPort;

            // Remitente y Destinatario
            $mail->setFrom($smtpUser, 'mood ZAHI');
            $mail->addAddress($row['email']);

            // Contenido del Email
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = '¡Ya estás en la lista de espera de mood ZAHI!';
            $mail->Body    = '
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #d97706; text-transform: uppercase;">¡Gracias por unirte!</h2>
                    <p style="font-size: 16px; color: #333;">Hola,</p>
                    <p style="font-size: 16px; color: #333;">Hemos registrado tu solicitud para el acceso anticipado a <strong>mood ZAHI</strong>.</p>
                    <p style="font-size: 16px; color: #333;">Te avisaremos muy pronto cuando tu cuenta esté lista para activarse y puedas empezar a sentir cada kilómetro.</p>
                    <br>
                    <p style="font-size: 14px; color: #666;">El equipo de mood ZAHI</p>
                </div>
            ';
            $mail->AltBody = "¡Gracias por unirte!\n\nHemos registrado tu solicitud para el acceso anticipado a mood ZAHI.\nTe avisaremos muy pronto cuando tu cuenta esté lista.\n\nEl equipo de mood ZAHI";

            // Enviar correo
            $mail->send();
            
            // Marcar como enviado en la Base de Datos
            $update = $pdo->prepare("UPDATE solicitudes_acceso SET correo_enviado = 1 WHERE solicitud_id = :id");
            $update->execute(['id' => $row['solicitud_id']]);
            
            echo "Enviado exitosamente a: " . $row['email'] . "\n";
            
        } catch (Exception $e) {
            echo "Error enviando a {$row['email']}: {$mail->ErrorInfo}\n";
        }
    }
    
} catch (PDOException $e) {
    echo "Error de Base de Datos: " . $e->getMessage() . "\n";
}
?>
