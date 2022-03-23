import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/notfound.module.css";
function Notfound() {
  return (
    <section className={styles.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className={styles.four_zero_four_bg}>
                <h1 className="text-center ">404</h1>
              </div>

              <div className={styles.contant_box_404}>
                <h2 className="text-3xl font-[Arvo] p-3">
                  Look like you're lost
                </h2>

                <p className="font-[Arvo]">
                  the page you are looking for not avaible!
                </p>

                <Link to="/" className={styles.link_404}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notfound;
