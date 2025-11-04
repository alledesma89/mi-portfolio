import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nombre, email, telefono, asunto, otroAsunto } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Consulta de ${nombre} - ${asunto}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${telefono}
        Asunto: ${asunto}
        ${asunto === "Otros" ? `Descripción: ${otroAsunto}` : ""}
      `,
    });

    return new Response(JSON.stringify({ success: true, info }), { status: 200 });
  } catch (err) {
    console.error("Error al enviar email:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
