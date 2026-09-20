import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  if (!item) {
    return null;
  }

  return (
    <dialog open={Boolean(item)}>
      <h2>{item.title}</h2>

      <p>{item.description}</p>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      )}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),

  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;