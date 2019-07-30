import PropTypes from 'prop-types';

const buildCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  uid: PropTypes.string.isRequired,
});

export default { buildCardShape };
