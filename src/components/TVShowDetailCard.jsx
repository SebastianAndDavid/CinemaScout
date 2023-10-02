import PropTypes from "prop-types";

export default function TVShowDetailCard({ TVShowDetails }) {
  console.log("TVShowDetails", TVShowDetails);

  return <div>TVShowDetailCard</div>;
}
TVShowDetailCard.propTypes = {
  TVShowDetails: PropTypes.object.isRequired,
};
