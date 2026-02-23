import Link from "next/link";

export default function PageHeader({
  title,
  breadcrumbs = [],
  backgroundImage, // 👈 new prop
}) {
  return (
    <div
      className="page-header bg-section dark-section"
      // style={
      //   backgroundImage
      //     ? {
      //         backgroundImage: `url(${backgroundImage})`,
      //         backgroundSize: "cover",
      //         backgroundPosition: "center",
      //         backgroundRepeat: "no-repeat",
      //       }
      //     : undefined
      // }
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="page-header-box">
              <h1 className="text-anime-style-3" data-cursor="-opaque">
                {title}
              </h1>

              <nav className="wow fadeInUp">
                <ol className="breadcrumb">
                  {breadcrumbs.map((item, index) => (
                    <li
                      key={index}
                      className={`breadcrumb-item ${
                        index === breadcrumbs.length - 1 ? "active" : ""
                      }`}
                      aria-current={
                        index === breadcrumbs.length - 1 ? "page" : undefined
                      }
                    >
                      {item.href && index !== breadcrumbs.length - 1 ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
