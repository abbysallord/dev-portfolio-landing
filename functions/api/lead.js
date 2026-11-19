export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const host = context.request.headers.get("host") || "";
    const projectName = host.replace(".pages.dev", "") || "dev-portfolio-landing";
    await fetch("https://shenoy.anvaya.agency/api/leads/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project: projectName, lead: data })
    }).catch(e => console.error("Lead webhook error:", e));
    return Response.json({ success: true, message: "Thank you! Your request has been received." });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
