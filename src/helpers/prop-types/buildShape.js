import PropTypes from 'prop-types';

const buildCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { buildCardShape };
