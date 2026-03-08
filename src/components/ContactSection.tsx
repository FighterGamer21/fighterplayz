const ContactSection = () => {
  return (
    <section className="py-24 px-4 bg-muted/30" id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl text-primary glow-text mb-4">
          CONTACT
        </h2>
        <p className="text-muted-foreground font-body mb-12">
          Ready to build something epic? Let's connect.
        </p>

        <div className="bg-code-bg pixel-border p-8 font-mono-code text-sm text-left inline-block w-full max-w-lg">
          <div className="text-muted-foreground mb-2">$ echo "Get in touch"</div>
          <div className="mb-4">
            <span className="text-primary">discord:</span>{" "}
            <span className="text-card-foreground">Available on request</span>
          </div>
          <div className="mb-4">
            <span className="text-primary">status:</span>{" "}
            <span className="text-minecraft-green">● Open for work</span>
          </div>
          <div>
            <span className="text-primary">services:</span>{" "}
            <span className="text-card-foreground">MC Server Dev, Web Dev, Plugin Development</span>
          </div>
          <div className="mt-6 text-muted-foreground">
            <span className="cursor-blink">$ _</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
