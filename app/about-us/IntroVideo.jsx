export default function IntroVideo() {
  return (
    <div className="intro-video-box bg-section">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-12">
            
            <div
              className="intro-video wow fadeInUp"
              data-wow-delay="0.2s"
            >
              
              {/* Image */}
              <div className="intro-video-image">
                <figure>
                  <img
                    src="/images/intro-video-image.jpg"
                    alt="Intro Video"
                  />
                </figure>
              </div>

              {/* Play Button */}
              <div className="video-play-button bg-effect">
                <a
                  href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                  className="popup-video"
                  data-cursor-text="Play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-play"></i>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
