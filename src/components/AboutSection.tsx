const AboutSection = () => {
  return (
    <section className="py-24 px-4" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-12">
          ABOUT ME
        </h2>

        <div className="bg-card pixel-border p-8">
          <div className="font-mono-code text-sm mb-6">
            <span className="text-muted-foreground">/**</span>
            <br />
            <span className="text-muted-foreground"> * @developer</span>
            <br />
            <span className="text-muted-foreground"> * @experience 6+ years</span>
            <br />
            <span className="text-muted-foreground"> */</span>
          </div>

          <p className="font-body text-card-foreground leading-relaxed mb-6">
            I'm a passionate developer who bridges the gap between{" "}
            <span className="text-primary font-semibold">Minecraft server development</span> and{" "}
            <span className="text-primary font-semibold">modern web engineering</span>. 
            With over 6 years of experience, I've built and maintained servers for some of 
            the most active Minecraft communities out there.
          </p>

          <p className="font-body text-card-foreground leading-relaxed mb-8">
            From writing complex Java plugins and C++ optimizations to creating full web 
            dashboards with HTML, CSS, JavaScript, and Python backends — I bring the same 
            dedication to every project, whether it's 
            a game server handling hundreds of players or a web app serving thousands of users.
          </p>

          {/* Tech stack grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {["Java", "Python", "C++", "HTML", "CSS", "JS"].map((tech) => (
              <div
                key={tech}
                className="bg-muted px-3 py-2 text-center font-pixel text-[10px] text-primary border border-border hover:border-primary transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
