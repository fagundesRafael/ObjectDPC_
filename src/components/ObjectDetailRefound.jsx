import { Link } from "react-router-dom";

import * as BsIcons from "react-icons/bs";

const ObjectDetailAll = ({ object }) => {
  return (
    <div className="objects">
      {object.status === "refound" && (
        <h4>
          {object.quantity} {object.unity}
        </h4>
      )}
      {object.status === "refound" && <h4>{object.title}</h4>}
      {object.status === "refound" && <h4>{object.type}</h4>}
      {object.status === "refound" && <h4>{object.brand}</h4>}
      {object.status === "refound" && <h4>{object.color}</h4>}
      {object.status === "refound" && <h4>{object.inquiryNumber}</h4>}
      {object.status === "refound" && <h4>{object.term}</h4>}
      {object.status === "refound" && <h4>{object.aai}</h4>}
      {object.status === "refound" && <h4>{object.reportNumber}</h4>}
      {object.status === "refound" && (
        <div className="links">
          <Link to={`/object/${object.id}`}>
            <span>
              <BsIcons.BsSearch />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ObjectDetailAll;
