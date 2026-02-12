
import Button from "@/components/UI/Button/Button"
export default function NotFound() {
  return (
    <div className="error-page py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <div className="error-page-image wow fadeInUp">
              <img height={200} src="/images/404-error-img.png" alt="404 Error" style={{width: 'auto'}} />
            </div>

            <div className="error-page-content">
              <div className="section-title">
                <h2
                  className="text-anime-style-3"
                  data-cursor="-opaque"
                >
                  Oops! page not found
                </h2>
              </div>
              <div className="error-page-content-body pb-5">
                <p
                  className="wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  The page you are looking for does not exist.
                </p>

                <Button href="/" variant="primary">Back to Home</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
