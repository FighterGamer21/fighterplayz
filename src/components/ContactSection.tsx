import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="py-24 px-4 relative" id="contact">
      <div className="absolute inset-0 block-grid opacity-20" />
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Achievement banner */}
        <motion.div
          className="achievement-banner px-4 py-3 mb-10 font-mono-code text-sm text-left max-w-lg mx-auto"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-minecraft-gold font-pixel text-[10px]">📬 QUEST AVAILABLE:</span>{" "}
          <span className="text-card-foreground">Hire a Developer</span>
        </motion.div>

        <h2 className="text-xl md:text-2xl text-primary glow-text mb-4">
          CONTACT
        </h2>
        <p className="text-muted-foreground font-body mb-12">
          Ready to build something epic? Let's connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Terminal */}
          <motion.div
            className="bg-code-bg pixel-border p-6 font-mono-code text-sm text-left relative overflow-hidden scanlines"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
              <span className="w-3 h-3 rounded-full bg-minecraft-redstone" />
              <span className="w-3 h-3 rounded-full bg-minecraft-gold" />
              <span className="w-3 h-3 rounded-full bg-minecraft-green" />
              <span className="text-muted-foreground text-[10px] ml-2">contact.sh</span>
            </div>
            <div className="text-muted-foreground mb-3">$ cat contact_info.txt</div>
            <div className="space-y-3">
              <div>
                <span className="text-primary">discord:</span>{" "}
                <span className="text-card-foreground">Available on request</span>
              </div>
              <div>
                <span className="text-primary">status:</span>{" "}
                <span className="text-minecraft-green">● Open for work</span>
              </div>
              <div>
                <span className="text-primary">response_time:</span>{" "}
                <span className="text-card-foreground">~24h</span>
              </div>
            </div>
            <div className="mt-4 text-muted-foreground">
              <span className="cursor-blink">$ _</span>
            </div>
          </motion.div>

          {/* Services card */}
          <motion.div
            className="bg-card pixel-border-gold p-6 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="font-pixel text-[10px] text-minecraft-gold glow-text-gold mb-5">
              SERVICES
            </h3>
            <div className="space-y-3">
              {[
                { icon: "⛏️", name: "MC Server Development", desc: "Plugins, configs, systems" },
                { icon: "🌐", name: "Web Development", desc: "Full-stack web apps" },
                { icon: "🔧", name: "Plugin Development", desc: "Custom Spigot/Paper plugins" },
                { icon: "🛡️", name: "Server Optimization", desc: "Performance & security" },
                { icon: "🎮", name: "Game Mode Design", desc: "Custom minigames & modes" },
              ].map((service) => (
                <motion.div
                  key={service.name}
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-lg">{service.icon}</span>
                  <div>
                    <div className="font-mono-code text-xs text-card-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-body">{service.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="font-pixel text-[10px] text-muted-foreground mb-4">
            ⚡ LET'S BUILD SOMETHING LEGENDARY ⚡
          </div>
          <div className="inline-flex gap-3">
            <div className="inventory-slot px-6 py-3 font-pixel text-[10px] text-primary cursor-pointer hover:scale-105 transition-transform">
              💬 DM ME
            </div>
            <div className="inventory-slot px-6 py-3 font-pixel text-[10px] text-minecraft-gold cursor-pointer hover:scale-105 transition-transform">
              📋 VIEW RESUME
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
