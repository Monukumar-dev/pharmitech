'use client'


import useParallax from "@/hooks/useParallax"

export default function TechSection() {
  
  useParallax(".tech-parallax-bg", 420)

  return (
    <section>
      <div className="container position-relative z-3 border rounded-3 wow">
          <img className="img-fluid" src="images/pharminTECH.png" alt="" />
      </div>
    </section>
  )

  // return (
  //   <section className="tech-section bg-section dark-section">
  //     <div
  //       className="tech-parallax-bg"
  //       style={{backgroundImage: "url('/images/cleanroom-wall-ceiling-door.jpg')",}}
  //     />

  //     <div className="container position-relative z-3">
  //       <div className="row align-items-center">
  //         <div className="col-lg-6 mb-5 mb-lg-0">
  //           <div className="tech-left text-end">
  //             <div className="tech-small">It starts with the technology</div>
  //             <div className="tech-title">
  //               The tech in <br />
  //               <span>PharminTECH</span>
  //             </div>
  //             <div className="tech-sub">stands for</div>
  //           </div>
  //         </div>
  //         <div className="col-lg-6">
  //           <div className="tech-list">
  //             {["T", "E", "C", "H"].map((l, i) => (
  //               <div className="tech-item wow" key={i}>
  //                 <div className="tech-circle">{l}</div>
  //                 <div className="tech-text">
  //                   {[
  //                     "Technology Driven",
  //                     "Engineering Excellence",
  //                     "Construction & Aesthetics",
  //                     "High-Quality Products",
  //                   ][i]}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   </section>
  // )
}
