import TextEffect from "../../components/TextEffect";
import TeamCard from "../../components/TeamCard";

export default function OurTeam() {
  const teamMembers = [
    {
      image: "/images/team-1.jpg",
      name: "Daniel Reyes",
      role: "Founder & CEO",
      delay: "0s",
    },
    {
      image: "/images/team-2.jpg",
      name: "Leslie Alexander",
      role: "Partnerships Lead",
      delay: "0.2s",
    },
    {
      image: "/images/team-3.jpg",
      name: "Esther Howard",
      role: "Community Manager",
      delay: "0.4s",
    },
    {
      image: "/images/team-4.jpg",
      name: "Brooklyn Simmons",
      role: "Interior Designer",
      delay: "0.6s",
    },
  ];

  return (
    <div className="our-team">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">Our Team</h3>
              <div
                className="text-effect"
                data-cursor="-opaque"
              >
                <TextEffect text="Meet the visionaries behind our inspiring workspaces" />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="section-title-content">
              <p
                className="wow fadeInUp"
                data-wow-delay="0.2s"
              >
                From flexible office solutions to dedicated member
                services, we provide everything you need to thrive –
                fast Wi-Fi, meeting rooms, modern amenities, and a
                vibrant community.
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="row">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="col-xl-3 col-md-6"
            >
              <TeamCard {...member} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
