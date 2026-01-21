import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Missing fields" }));
    }

    const { data, error } = await resend.emails.send({
      // بالبداية هذا يمشي غالبًا، وبعدها بتوثقي دومينك/سندر
      from: "Portfolio <onboarding@resend.dev>",
      to: ["elinshaia23@gmail.com"], // بريدك اللي بدك توصلك عليه الرسائل
      replyTo: email, // حتى لما تعملي Reply يرد على الزبون
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    if (error) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ ok: false, error }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, data }));
  } catch (e: any) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ ok: false, error: e?.message || "Server error" }));
  }
}
