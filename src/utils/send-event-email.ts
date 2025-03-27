import { env } from '@/env/env';
import { Theme } from 'next-auth';
import { Resend } from 'resend';
import { AppError } from './app-error';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const resend = new Resend(env.NEXT_API_KEY);
dayjs.extend(utc);
dayjs.extend(timezone);

export async function sendEventEmail(identifier: string, schedulingDate: string) {
  try {
    const schedulingDateBefore = dayjs(schedulingDate).subtract(30, 'minutes').format()
    const emailResponseBefore = await resend.emails.send({
      to: identifier,
      from: `Petshop <noreplypetshop@${env.NEXT_EMAIL_FROM}>`,
      subject: `Lembrete do tratamento - Petshop`,
      text: text(),
      scheduledAt: schedulingDateBefore,
      html: htmlBefore(schedulingDate),
    })

    const emailResponseInTime = await resend.emails.send({
      to: identifier,
      from: `Petshop <noreplypetshop@${env.NEXT_EMAIL_FROM}>`,
      subject: `Lembrete do tratamento - Petshop`,
      text: text(),
      scheduledAt: schedulingDate,
      html: htmlInTime(schedulingDate),
    })

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
  const schedulingDateFormat = dayjs.utc(schedulingDate)
  .tz(dayjs.tz.guess())
  .startOf('hour')
  .format('HH:mm DD-MM-YYYY');
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
<img src="https://petshop-jade-xi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.248d1717.png&w=64&q=75" alt="Logo de Petshop"/>
<h2>Petshop</h2>
</td>
</tr>

<tr>
<td align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
"Olá! Este é um lembrete de que o tratamento do seu pet está agendado para ${schedulingDateFormat}. Ainda há tempo para se preparar. Caso não possa comparecer, entre em contato para reagendar."</td>
</tr>

<tr>
<td align="center"
style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Se você não solicitou esse email, por favor apenas ignore
</td>
</tr>
</table>
<footer>
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} Petshop </p>
</footer>
</body>
`
}


function htmlInTime(schedulingDate: string) {
  const schedulingDateFormat = dayjs.utc(schedulingDate)
  .tz(dayjs.tz.guess())
  .startOf('hour')
  .format('HH:mm DD-MM-YYYY');
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
<img src="https://petshop-jade-xi.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.248d1717.png&w=64&q=75" alt="Logo de Dente da Petshop"/>
<h2>Petshop</h2>
</td>
</tr>

<tr>
<td align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Olá! o tratamento do seu pet está marcado para agora (${schedulingDateFormat}). Estamos esperando por você! Caso tenha algum imprevisto, entre em contato com a clínica</td>
</tr>

<tr>
<td align="center"
style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Se você não solicitou esse email, por favor apenas ignore
</td>
</tr>
</table>
<footer>
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} Petshop </p>
</footer>
</body>
`
}

function text() {
  return `Lembrete tratamento do seu pet Petshop`
}
