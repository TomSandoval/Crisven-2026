import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json()

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Crisven Web <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `Nuevo contacto de ${nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 })
  }
}