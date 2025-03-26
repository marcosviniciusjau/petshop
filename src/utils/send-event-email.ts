import { env } from '@/env/env';
import { Theme } from 'next-auth';
import { Resend } from 'resend';
import { AppError } from './app-error';
import dayjs from 'dayjs';
const resend = new Resend(env.NEXT_API_KEY);

export async function sendEventEmail(identifier: string, schedulingDate: string) {
  try {
    const schedulingDateBefore = dayjs(schedulingDate).subtract(30, 'minutes').format()
    const emailResponseBefore = await resend.emails.send({
      to: identifier,
      from: `PetShop <noreply-dental-clinic+@${env.NEXT_EMAIL_FROM}>`,
      subject: `Lembrete da consulta - PetShop`,
      text: text(),
      scheduledAt: schedulingDateBefore,
      html: htmlBefore(schedulingDate),
    })

    const emailResponseInTime = await resend.emails.send({
      to: identifier,
      from: `PetShop <noreply-dental-clinic+@${env.NEXT_EMAIL_FROM}>`,
      subject: `Lembrete da consulta - PetShop`,
      text: text(),
      scheduledAt: schedulingDate,
      html: htmlInTime(schedulingDate),
    })

    console.log(emailResponseBefore)

    console.log(emailResponseInTime)
    if (emailResponseBefore.error) {
      throw new AppError(`Erro ao enviar email: ${emailResponseBefore.error.message}`, 400);
    }

    if (emailResponseInTime.error) {
      throw new AppError(`Erro ao enviar email: ${emailResponseInTime.error.message}`, 400);
    }

  } catch (error) {
    console.error(error)
  }

}

function htmlBefore(schedulingDate: string) {
  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
<table width="100%" border="0" cellspacing="20" cellpadding="0"
style="background: ${color.mainBackground}; max-width: 48rem; margin: auto; border-radius: 10px;">

<tr align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
<td>
<img src="https://dental-clinic+-two-gamma.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9c598bf7.png&w=128&q=75" alt="Logo de Dente da PetShop"/>
<h2>PetShop</h2>
</td>
</tr>

<tr>
<td align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
"Olá! Este é um lembrete de que sua consulta está agendada para ${schedulingDate}. Ainda há tempo para se preparar. Caso não possa comparecer, entre em contato para reagendar."</td>
</tr>

<tr>
<td align="center"
style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Se você não solicitou esse email, por favor apenas ignore
</td>
</tr>
</table>
<footer>
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} PetShop </p>
</footer>
</body>
`
}

function htmlInTime(schedulingDate: string) {
  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
<table width="100%" border="0" cellspacing="20" cellpadding="0"
style="background: ${color.mainBackground}; max-width: 48rem; margin: auto; border-radius: 10px;">

<tr align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
<td>
<img src="https://dental-clinic+-two-gamma.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9c598bf7.png&w=128&q=75" alt="Logo de Dente da PetShop"/>
<h2>PetShop</h2>
</td>
</tr>

<tr>
<td align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Olá! Sua consulta está marcada para agora (${schedulingDate}). Estamos esperando por você! Caso tenha algum imprevisto, entre em contato com a clínica</td>
</tr>

<tr>
<td align="center"
style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Se você não solicitou esse email, por favor apenas ignore
</td>
</tr>
</table>
<footer>
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} PetShop </p>
</footer>
</body>
`
}

function text() {
  return `Lembrete da consulta PetShop`
}
