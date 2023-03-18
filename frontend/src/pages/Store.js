import React from "react";
import { Link } from "react-router-dom";

const ourStore1 = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p>
              <Link to="/" className="text-black">
                Home{" "}
              </Link>{" "}
              /{title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ourStore1;
