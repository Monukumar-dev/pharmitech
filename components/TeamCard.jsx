export default function TeamCard({
  image,
  name,
  experience_years,
  profile,
  delay = "0s",
}) {
  return (
    <div className="team-item wow fadeInUp" data-wow-delay={delay} >
      <div className="team-image">
        <a href="#" data-cursor-text="View">
          <figure>
            <img height="400px" width='auto' src={image} alt={name} />
          </figure>
        </a>
      </div>

      <div className="team-item-body">
        <div className="team-content">
          <h3>
            <a href="#">{name}</a>
          </h3>
          <p>{experience_years}</p>
          <p>{profile}</p>
        </div>
        

        <div className="team-social-list">
          <ul>
            <li>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </li>
            <li>
              <a href="#"><i className="fab fa-dribbble"></i></a>
            </li>
            <li>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
